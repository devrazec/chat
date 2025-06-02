import React, { useEffect, Suspense, useContext, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  TextField,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  InputAdornment,
  Divider,
  Stack,
  Chip,
} from "@mui/material"
import { Send as SendIcon, Search as SearchIcon } from "@mui/icons-material"

// Context
import { DataContext } from '../context/DataProvider';

const contacts = [
  {
    id: 1,
    name: "Lucy Lavender",
    lastMessage: "Sent a photo",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2h ago",
  },
  {
    id: 2,
    name: "Remy Sharp",
    lastMessage: "Coffee?",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1h ago",
    active: true,
  },
  {
    id: 3,
    name: "Cassandra Mixon",
    lastMessage: "Hello! 👋",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "30m ago",
  },
]

const messages = [
  {
    id: 1,
    sender: "Remy Sharp",
    content: "Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.",
    timestamp: "20 minutes ago",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    sender: "You",
    content: "Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.",
    timestamp: "12 minutes ago",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    sender: "Remy Sharp",
    content: "Cum ea graeci tractatos. 😊",
    timestamp: "8 minutes ago",
    isOwn: false,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    sender: "You",
    content: "Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci. 👍",
    timestamp: "5 minutes ago",
    isOwn: true,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function Chat3() {

  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      console.log("Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
        {/* Left Sidebar - Contacts */}
        <Paper
          elevation={1}
          sx={{
            width: 360,
            display: "flex",
            flexDirection: "column",
            borderRadius: 0,
          }}
        >
          {/* Search Bar */}
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              placeholder="Search contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Contacts List */}
          <List sx={{ flex: 1, p: 0 }}>
            {contacts.map((contact, index) => (
              <React.Fragment key={contact.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 2,
                    bgcolor: contact.active ? "action.selected" : "transparent",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} alt={contact.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {contact.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {contact.lastMessage}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < contacts.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 0,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
            <TextField
              fullWidth
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            </Stack>
          </Paper>

          {/* Messages Area */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflowY: "auto",
              bgcolor: "#fafafa",
            }}
          >
            <Stack spacing={3}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: message.isOwn ? "flex-end" : "flex-start",
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  {!message.isOwn && <Avatar src={message.avatar} alt={message.sender} sx={{ width: 32, height: 32 }} />}

                  <Box sx={{ maxWidth: "70%" }}>
                    <Paper
                      elevation={1}
                      sx={{
                        p: 2,
                        bgcolor: message.isOwn ? "primary.main" : "background.paper",
                        color: message.isOwn ? "primary.contrastText" : "text.primary",
                        borderRadius: 2,
                        borderTopLeftRadius: message.isOwn ? 2 : 0.5,
                        borderTopRightRadius: message.isOwn ? 0.5 : 2,
                      }}
                    >
                      <Typography variant="body2">{message.content}</Typography>
                    </Paper>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: message.isOwn ? "flex-end" : "flex-start",
                        mt: 0.5,
                        gap: 1,
                        alignItems: "center",
                      }}
                    >
                      {message.isOwn && (
                        <Chip
                          label="You"
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: "0.75rem",
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                          }}
                        />
                      )}
                      <Typography variant="caption" color="text.secondary">
                        {message.timestamp}
                      </Typography>
                    </Box>
                  </Box>

                  {message.isOwn && <Avatar src={message.avatar} alt={message.sender} sx={{ width: 32, height: 32 }} />}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Message Input */}
          <Paper
            elevation={1}
            sx={{
              p: 2,
              borderRadius: 0,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="flex-end">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Type your message"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
              <IconButton
                color="primary"
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "action.disabledBackground",
                    color: "action.disabled",
                  },
                  mb: 0.5,
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
