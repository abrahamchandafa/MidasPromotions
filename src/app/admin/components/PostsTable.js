"use client";
import * as React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import DoneIcon from "@mui/icons-material/Done";
import CachedIcon from "@mui/icons-material/Cached";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  ModalClose,
  Select,
  Option,
  Table,
  Sheet,
  Checkbox,
  IconButton,
  Typography,
  Menu,
  MenuButton,
  MenuItem,
  Dropdown,
  Link,
  CircularProgress
} from "@mui/joy";
import {
  OpenInNew as OpenInNewIcon,
  Search as SearchIcon,
  MoreHorizRounded as MoreHorizRoundedIcon,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/joy/styles";

import { useEvents } from "@/context/EventsContext";

export default function EventsTable() {
  const { events, loading, error } = useEvents();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [categoryFilter, setCategoryFilter] = React.useState("release");
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [editedEvent, setEditedEvent] = React.useState(null);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [smallEventImage, setSmallEventImage] = React.useState(null); 
  const [largeEventImage, setLargeEventImage] = React.useState(null); 
  const [ editLoading, setEditLoading] = React.useState(false);

  const { mode } = useColorScheme();

  const getStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);

    if (endDate < now) return "Past";
    if (startDate > now) return "Upcoming";
    return "Ongoing";
  };

  const filteredEvents = events.filter((event) => {
    const status = getStatus(event);
    const matchesSearch = event.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || status.toLowerCase() === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      (event.releaseEvent ? "release" : "nonrelease") === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleDeleteEvent = async () => {
    try {
      setDeleteLoading(true);
      const response = await fetch('/api/delete_event', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedEvent.id }),
      });
  
      const data = await response.json();
      console.log(data); // { success: true, message: "Event deleted successfully" }
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setDeleteLoading(false);
      setOpenDeleteModal(false);
    }
  };

  const handleEditEvent = async () => {
    try {
      setEditLoading(true);
      const formData = new FormData();
  
      formData.append("eventData", JSON.stringify(editedEvent));
  
      // Check if images are being updated and append them if so
      if (smallEventImage) {
        formData.append("smallEventImage", smallEventImage);
      }
  
      if (largeEventImage) {
        formData.append("largeEventImage", largeEventImage);
      }
  
      // Send the PUT request with FormData as the body
      const response = await fetch(`/api/edit_event`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        
        setOpenEditModal(false); // Close the edit modal
      } else {
        console.error("Failed to update event:", await response.json());
      }
    } catch (error) {
      console.error("Edit error:", error);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Input
          placeholder="Search by title"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl>
          <FormLabel>Status</FormLabel>
          <Select
            value={statusFilter}
            onChange={(e, newValue) => setStatusFilter(newValue)}
          >
            <Option value="all">All</Option>
            <Option value="past">Past</Option>
            <Option value="ongoing">Ongoing</Option>
            <Option value="upcoming">Upcoming</Option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Category</FormLabel>
          <Select
            value={categoryFilter}
            onChange={(e, newValue) => setCategoryFilter(newValue)}
          >
            <Option value="all">All</Option>
            <Option value="release">Release</Option>
            <Option value="nonrelease">Non-Release</Option>
          </Select>
        </FormControl>
      </Box>

      <Sheet variant="outlined">
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Time</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event) => (
              <tr
                key={event.id}
                onClick={() => {
                  setSelectedEvent(event);
                  setOpenModal(true);
                }}
                style={{
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    mode === "dark" ? "#424242" : "#f0f0f0")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "")
                }
              >
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>
                  {event.venue.city
                    ? `${event.venue.city}${event.venue.country ? ", " : ""}`
                    : ""}
                  {event.venue.country}
                </td>
                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                <td>{new Date(event.start_date).toLocaleTimeString()}</td>
                <td>{event.releaseEvent ? "Release" : "Non-Release"}</td>
                <td>
                  <Chip
                    startDecorator={
                      getStatus(event) === "Past" ? (
                        <DoneIcon />
                      ) : getStatus(event) === "Ongoing" ? (
                        <CachedIcon />
                      ) : (
                        <UpcomingIcon />
                      )
                    }
                    color={
                      getStatus(event) === "Past"
                        ? "neutral"
                        : getStatus(event) === "Ongoing"
                        ? "warning"
                        : "success"
                    }
                  >
                    {getStatus(event)}
                  </Chip>
                </td>
                <td>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizRoundedIcon />
                    </MenuButton>
                    <Menu>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditedEvent(event);
                          setOpenEditModal(true);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                          setOpenDeleteModal(true);
                        }}
                      >
                        Delete
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        href={`/events/${event.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open Externally <OpenInNewIcon />
                      </MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <ModalDialog>
          <ModalClose />
          <Typography level="h4">Confirm Deletion</Typography>
          <Divider />
          <Typography>Are you sure you want to delete this event?</Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button onClick={handleDeleteEvent} color="danger">
              { deleteLoading ? (
                  <CircularProgress />
                ) : 'Delete'
              }
            </Button>
            <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          </Box>
        </ModalDialog>
      </Modal>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        sx={{
          overflowY: "auto",
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: "60%",
            width: "60%",
            height: "90vh",
            overflowY: "auto",
          }}
        >
          <ModalClose />
          <Typography level="h4">Edit Post</Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <FormLabel>Title</FormLabel>
              <Input
                value={editedEvent?.title || ""}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, title: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Description</FormLabel>
              <ReactQuill
                value={editedEvent?.description || ""}
                onChange={(value) =>
                  setEditedEvent({
                    ...editedEvent,
                    description: value,
                  })
                }
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    ["link"],
                    ["clean"],
                  ],
                }}
                style={{ height: "500px", marginBottom: "16px" }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 8 }}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="datetime-local"
                value={editedEvent?.start_date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, start_date: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="datetime-local"
                value={editedEvent?.end_date}
                onChange={(e) =>
                  setEditedEvent({ ...editedEvent, end_date: e.target.value })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Venue Address</FormLabel>
              <Input
                value={editedEvent?.venue?.address || ""}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    venue: { ...editedEvent.venue, address: e.target.value },
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Venue City</FormLabel>
              <Input
                value={editedEvent?.venue?.city || ""}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    venue: { ...editedEvent.venue, city: e.target.value },
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Venue Country</FormLabel>
              <Input
                value={editedEvent?.venue?.country || ""}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    venue: { ...editedEvent.venue, country: e.target.value },
                  })
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Upload Small Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setSmallEventImage(file)
                  }
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <FormLabel>Upload Large Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setLargeEventImage(file)
                  }
                }}
              />
            </FormControl>
            <FormControl sx={{ mt: 2 }}>
              <FormLabel>Is this a Release Post? tick if Yes(default):</FormLabel>
              <Checkbox
                checked={editedEvent?.releaseEvent || true}
                onChange={(e) =>
                  setEditedEvent({
                    ...editedEvent,
                    releaseEvent: e.target.checked,
                  })
                }
              />
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button onClick={handleEditEvent} color="primary">
              {editLoading ? (
                <CircularProgress />
              ) : 'Save Changes' }
            </Button>
            <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
          </Box>
        </ModalDialog>
      </Modal>

      {selectedEvent && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog>
            <ModalClose />
            <Box sx={{ overflowY: "auto", maxHeight: "80vh" }}>
              <Box sx={{ mb: 2 }}>
                <img
                  src={
                    process.env.NEXT_PUBLIC_MEDIA_BASE_URL +
                    (selectedEvent.bucketImages?.large ||
                      selectedEvent.bucketImages?.medium ||
                      selectedEvent.bucketImages?.small)
                  }
                  alt="Event"
                  style={{ width: "90%", height: "auto", borderRadius: "8px" }}
                  layout="responsive"
                />
              </Box>

              <Typography level="h2">{selectedEvent.title}</Typography>
              <Divider />

              <ReactQuill
                value={selectedEvent.description}
                readOnly={true}
                theme="bubble"
                style={{ marginTop: "16px", pointerEvents: "none" }}
              />

              <Box sx={{ mt: 2 }}>
                <Typography level="body-sm">
                  <strong>Venue:</strong>{" "}
                  {selectedEvent.venue.address &&
                    `${selectedEvent.venue.address}, `}
                  {selectedEvent.venue.city &&
                    `${selectedEvent.venue.city}${
                      selectedEvent.venue.country ? ", " : ""
                    }`}
                  {selectedEvent.venue.country}
                </Typography>
                <Typography level="body-sm">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedEvent.start_date).toLocaleDateString()}
                </Typography>
                <Typography level="body-sm">
                  <strong>Time:</strong>{" "}
                  {new Date(selectedEvent.start_date).toLocaleTimeString()}
                </Typography>
                <Typography level="body-sm">
                  <strong>Category:</strong>{" "}
                  {selectedEvent.releaseEvent ? "Release" : "Non-Release"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <Button
                  component={Link}
                  href={`/events/${selectedEvent.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  startDecorator={<OpenInNewIcon />}
                >
                  Open Externally
                </Button>
                <Button onClick={() => setOpenModal(false)}>Close</Button>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      )}
    </Box>
  );
}
