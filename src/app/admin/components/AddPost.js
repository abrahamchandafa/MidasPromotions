"use client";

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Typography, Checkbox, Divider, Sheet, Modal } from '@mui/joy';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'; 
import { v4 as uuidv4 } from 'uuid'; 

const AddPost = () => {
  const [newEvent, setNewEvent] = useState({
    id: '', 
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    date: '', 
    venue: {
      address: '',
      city: '',
      country: '',
    },
    releaseEvent: true,
    bucketImages: {
      small: null,
      medium: null,
      large: null,
    }
  });

  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      setNewEvent((prevEvent) => ({
        ...prevEvent,
        [imageType]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventId = uuidv4();
    const creationDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format: YYYY-MM-DD HH:MM:SS
    
    // Prepare form data
    const formData = new FormData();
    Object.entries({ ...newEvent, id: eventId, date: creationDate }).forEach(([key, value]) => {
      if (key === 'venue') {
        Object.entries(value).forEach(([venueKey, venueValue]) => {
          formData.append(`venue[${venueKey}]`, venueValue);
        });
      } else {
        formData.append(key, value);
      }
    });

    const response = await fetch('/evt.json', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Event added successfully');
      setOpenSuccessModal(true);
      setNewEvent({
        id: '',
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        date: '',
        venue: {
          address: '',
          city: '',
          country: '',
        },
        releaseEvent: true,
        bucketImages: {
          small: null,
          medium: null,
          large: null,
        }
      });
    } else {
      console.error('Failed to add event');
    }
  };

  return (
    <Sheet
      sx={{
        padding: 2,
        borderRadius: '8px',
        boxShadow: 'md',
      }}
    >
      <Typography level="h4">Add New Post</Typography>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <FormLabel>Title</FormLabel>
          <Input
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Description</FormLabel>
          <ReactQuill
            value={newEvent.description}
            onChange={(value) => setNewEvent((prev) => ({ ...prev, description: value }))}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            style={{ height: '500px', marginBottom: '16px' }}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Start Date</FormLabel>
          <Input
            type="datetime-local"
            name="start_date"
            value={newEvent.start_date}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>End Date</FormLabel>
          <Input
            type="datetime-local"
            name="end_date"
            value={newEvent.end_date}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Venue Address</FormLabel>
          <Input
            name="address"
            value={newEvent.venue.address}
            onChange={(e) => handleInputChange({ target: { name: 'venue', value: { ...newEvent.venue, address: e.target.value } } })}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Venue City</FormLabel>
          <Input
            name="city"
            value={newEvent.venue.city}
            onChange={(e) => handleInputChange({ target: { name: 'venue', value: { ...newEvent.venue, city: e.target.value } } })}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Venue Country</FormLabel>
          <Input
            name="country"
            value={newEvent.venue.country}
            onChange={(e) => handleInputChange({ target: { name: 'venue', value: { ...newEvent.venue, country: e.target.value } } })}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Upload Small Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'bucketImages.small')}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <FormLabel>Upload Large Image</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'bucketImages.large')}
          />
        </FormControl>
        <FormControl sx={{ mt: 2 }}>
          <FormLabel>Is this a Release Post? tick if Yes(default):</FormLabel>
          <Checkbox
            checked={newEvent.releaseEvent}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, releaseEvent: e.target.checked }))
            }
          />
        </FormControl>
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button type="submit" color="primary">
            Add Post
          </Button>
          <Button onClick={() => setNewEvent({
            id: '',
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            date: '',
            venue: {
              address: '',
              city: '',
              country: '',
            },
            releaseEvent: false,
            bucketImages: {
              small: null,
              medium: null,
              large: null,
            }
          })}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Modal open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.default',
            borderRadius: '8px',
            boxShadow: 'md',
            maxWidth: '400px',
            margin: 'auto',
            marginTop: '20%',
            textAlign: 'center',
          }}
        >
          <Typography level="h5">Success!</Typography>
          <Typography>Your event was added successfully.</Typography>
          <Button onClick={() => setOpenSuccessModal(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Sheet>
  );
};

export default AddPost;