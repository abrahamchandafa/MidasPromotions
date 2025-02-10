"use client";
import * as React from "react";
import {
  Box,
  Button,
  Modal,
  ModalDialog,
  ModalClose,
  Input,
  Typography,
  Sheet,
} from "@mui/joy";
import { useColorScheme } from "@mui/joy/styles";

export default function MediaTable() {
  const [media, setMedia] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedMedia, setSelectedMedia] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const { mode } = useColorScheme();

  const fetchMedia = async (page) => {
    const response = await fetch(`/api/fetchImages?page=${page}&limit=10`);
    const data = await response.json();
    setMedia((prev) => [...prev, ...data.images]);
    setHasMore(data.nextPage);
  };

  React.useEffect(() => {
    fetchMedia(page);
  }, [page]);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Input
          placeholder="Search by title"
          sx={{ flexGrow: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: 2,
        }}
      >
        {filteredMedia.map((item) => (
          <Sheet
            key={item.name}
            sx={{
              cursor: "pointer",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: `0 2px 4px ${mode === "dark" ? "#000" : "#ccc"}`,
            }}
            onClick={() => {
              setSelectedMedia(item);
              setOpenModal(true);
            }}
          >
            <img
              src={item.publicUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <Typography level="body-md" sx={{ p: 1 }}>
              {item.name}
            </Typography>
          </Sheet>
        ))}
      </Box>

      {hasMore && (
        <Button onClick={() => setPage((prev) => prev + 1)} sx={{ mt: 2 }}>
          Load More
        </Button>
      )}

      {selectedMedia && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog>
            <ModalClose />
            <Box sx={{ overflowY: "auto", maxHeight: "80vh" }}>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedMedia.publicUrl}
                  alt={selectedMedia.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              <Typography level="h2">{selectedMedia.name}</Typography>
              <Typography level="body-sm">{selectedMedia.description}</Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button onClick={() => setOpenModal(false)}>Close</Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      )}
    </Box>
  );
}