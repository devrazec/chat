import React, { useEffect, Suspense, useContext, useState } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Badge,
  Chip,
  Button,
} from "@mui/material"
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon,
  MoreVert as MoreVertIcon,
  EmojiEmotions as EmojiIcon,
  Mic as MicIcon,
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Check as CheckIcon,
} from "@mui/icons-material"

// Context
import { DataContext } from '../context/DataProvider';

const contacts = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    time: "May 31",
    avatar: "/placeholder.svg?height=40&width=40",
    isActive: true,
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 2,
    name: "Adalberto Granzin",
    initials: "AG",
    message: "If it takes long you can mail me...",
    time: "May 30",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 3,
    name: "Zenia Jacobs",
    initials: "ZJ",
    message: "Thank you, looking forward to it.",
    time: "Dec 13",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 4,
    name: "Miguel Guelff",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Thank you, looking forward to it.",
    time: "Dec 11",
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: 5,
    name: "Lauran Starner",
    initials: "LS",
    message: "That sounds interesting. I'll hav...",
    time: "Dec 13",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 6,
    name: "Ramonita Veras",
    initials: "RV",
    message: "Sounds good. Let's do it.",
    time: "Dec 13",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 7,
    name: "Verla Morgano",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Great work. Keep it up.",
    time: "Dec 13",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 8,
    name: "Cecilia Shockey",
    initials: "CS",
    message: "Your Welcome!😊",
    time: "Dec 13",
    unreadCount: 1,
    isOnline: false,
  },
  {
    id: 9,
    name: "Ramonita Veras",
    initials: "RV",
    message: "Sounds good. Let's do it.",
    time: "Dec 13",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: 10,
    name: "Verla Morgano",
    avatar: "/placeholder.svg?height=40&width=40",
    message: "Great work. Keep it up.",
    time: "Dec 13",
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: 11,
    name: "Cecilia Shockey",
    initials: "CS",
    message: "Your Welcome!😊",
    time: "Dec 13",
    unreadCount: 1,
    isOnline: false,
  },
]

const messages = [
  {
    id: 1,
    text: "It should be MUI v5 compatible.",
    time: "8:45 AM",
    isSent: false,
  },
  {
    id: 2,
    text: "Absolutely!",
    time: "8:46 AM",
    isSent: true,
    isDelivered: true,
  },
  {
    id: 3,
    text: "This admin template is built with MUI!",
    time: "8:46 AM",
    isSent: true,
    isDelivered: true,
  },
  {
    id: 4,
    text: "Looks clean and fresh UI. 😍",
    time: "8:46 AM",
    isSent: false,
  },
  {
    id: 5,
    text: "It's perfect for my next project.",
    time: "",
    isSent: false,
  },
  {
    id: 6,
    text: "How can I purchase it?",
    time: "",
    isSent: false,
  },
  {
    id: 7,
    text: "Thanks, From our official site 😊",
    time: "8:46 AM",
    isSent: true,
    isDelivered: true,
  },
  {
    id: 8,
    text: "I will purchase it for sure. 👍",
    time: "2:03 PM",
    isSent: false,
  },
]


export default function Chat2() {

  const [selectedContact, setSelectedContact] = useState(contacts[0])
  const [messageText, setMessageText] = useState("")

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText("")
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const getAvatarContent = (contact) => {
    if (contact.avatar) {
      return <Avatar src={contact.avatar} sx={{ width: 40, height: 40 }} />
    }
    return (
      <Avatar
        sx={{
          width: 40,
          height: 40,
          bgcolor:
            contact.id === 1
              ? "#7c4dff"
              : contact.id === 2
                ? "#e1bee7"
                : contact.id === 3
                  ? "#ffcdd2"
                  : contact.id === 5
                    ? "#fff9c4"
                    : contact.id === 6
                      ? "#bbdefb"
                      : "#f8bbd9",
          color: contact.id === 1 ? "white" : "#333",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {contact.initials}
      </Avatar>
    )
  }

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5", position: "relative" }}>
        {/* Left Sidebar */}
        <Box sx={{ width: 380, overflow: "auto", bgcolor: "white", borderRight: "1px solid #e0e0e0" }}>
          {/* User Profile Header */}
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              
              <TextField
                placeholder="Search Contacts"
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
                    borderRadius: 3,
                    bgcolor: "#f8f9fa",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Contacts List */}
          <List sx={{ p: 0 }}>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                sx={{
                  cursor: "pointer",
                  bgcolor: contact.isActive ? "#7c4dff" : "transparent",
                  color: contact.isActive ? "white" : "inherit",
                  "&:hover": {
                    bgcolor: contact.isActive ? "#7c4dff" : "#f5f5f5",
                  },
                  px: 2,
                  py: 1.5,
                }}
              >
                <ListItemAvatar>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      contact.isOnline ? (
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            bgcolor: "#4caf50",
                            border: "2px solid white",
                          }}
                        />
                      ) : null
                    }
                  >
                    {getAvatarContent(contact)}
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                        {contact.name}
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {contact.time}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.8,
                          color: contact.isActive ? "inherit" : "text.secondary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "200px",
                        }}
                      >
                        {contact.message}
                      </Typography>
                      {contact.unreadCount > 0 && (
                        <Chip
                          label={contact.unreadCount}
                          size="small"
                          sx={{
                            bgcolor: "#f44336",
                            color: "white",
                            height: 20,
                            fontSize: "12px",
                            "& .MuiChip-label": { px: 1 },
                          }}
                        />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Main Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Box sx={{ p: 2, bgcolor: "white", borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                placeholder="Search Messages"
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                 
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f8f9fa",
                  },
                }}
              />
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton>
                  <PhoneIcon />
                </IconButton>
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* Messages Area */}
          <Box sx={{ flex: 1, p: 2, overflow: "auto", bgcolor: "#f8f9fa" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: message.isSent ? "flex-end" : "flex-start",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {!message.isSent && <Avatar src="/placeholder.svg?height=32&width=32" sx={{ width: 32, height: 32 }} />}
                  <Box sx={{ maxWidth: "70%" }}>
                    <Paper
                      sx={{
                        p: 2,
                        bgcolor: message.isSent ? "#7c4dff" : "white",
                        color: message.isSent ? "white" : "inherit",
                        borderRadius: 2,
                        borderBottomRightRadius: message.isSent ? 0 : 2,
                        borderBottomLeftRadius: message.isSent ? 2 : 0,
                        mb: 0.5,
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                    </Paper>
                    {message.time && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          justifyContent: message.isSent ? "flex-end" : "flex-start",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {message.time}
                        </Typography>
                        {message.isSent && message.isDelivered && <CheckIcon sx={{ fontSize: 14, color: "#4caf50" }} />}
                      </Box>
                    )}
                  </Box>
                  {message.isSent && <Avatar src="/placeholder.svg?height=32&width=32" sx={{ width: 32, height: 32 }} />}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Message Input */}
          <Box sx={{ p: 2, bgcolor: "white", borderTop: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type a message"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#f8f9fa",
                  },
                }}
              />
              <IconButton>
                <EmojiIcon />
              </IconButton>
              <IconButton>
                <MicIcon />
              </IconButton>
              <IconButton>
                <AttachFileIcon />
              </IconButton>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                sx={{
                  bgcolor: "#7c4dff",
                  "&:hover": { bgcolor: "#6200ea" },
                  borderRadius: 2,
                  textTransform: "none",
                  px: 3,
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Box>
        
      </Box>
    </>
  );
}
