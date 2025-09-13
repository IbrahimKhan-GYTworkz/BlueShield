// ChatInterface.tsx
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";

import {
  Box,
  CircularProgress,
  Container,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";

// Types
interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
  isStreaming?: boolean;
}

interface SuggestionQuestion {
  id: string;
  text: string;
  icon: React.ReactNode;
  category: string;
  gradient: string;
}

const ChatInterface: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  // State
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestion questions
  const suggestionQuestions: SuggestionQuestion[] = [
    {
      id: "1",
      text: "What are the latest developments in AI research?",
      icon: <PsychologyIcon />,
      category: "AI",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: "2",
      text: "Explain quantum computing in simple terms",
      icon: <ScienceIcon />,
      category: "Science",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: "3",
      text: "How do I start learning machine learning?",
      icon: <SchoolIcon />,
      category: "Education",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  // Handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "This is where the AI response would appear. The interface is ready for backend integration with streaming responses and agentic reasoning capabilities.",
        type: "assistant",
        timestamp: new Date(),
        isStreaming: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const toggleMic = () => {
    setMicActive(!micActive);
  };

  const getPlaceholderText = () => {
    const placeholders = [
      "Ask me anything...",
      "What would you like to know?",
      "Search for information...",
      "How can I help you today?",
    ];
    const index = Math.floor(Date.now() / 5000) % placeholders.length;
    return placeholders[index];
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(48, 111, 182, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 83, 204, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(48, 111, 182, 0.05) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          py: { xs: 3, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            textAlign: "center",
            mb: { xs: 4, md: 6 },
            mt: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
              fontWeight: 700,
              color: "var(--color-text)",
              mb: 2,
              fontFamily: "var(--font-poppins)",
              background:
                "linear-gradient(135deg, var(--color-text) 0%, var(--color-subtext) 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BlueShield AI
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              color: "var(--color-subtext)",
              fontWeight: 400,
              maxWidth: "600px",
              margin: "0 auto",
              fontFamily: "var(--font-poppins)",
              lineHeight: 1.5,
            }}
          >
            Ask anything, get intelligent answers powered by advanced AI
            reasoning
          </Typography>
        </Box>

        {/* Messages Area */}
        {messages.length > 0 ? (
          <Box
            sx={{
              flex: 1,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              overflowY: "auto",
              maxHeight: "60vh",
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.type === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  elevation={message.type === "assistant" ? 3 : 1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    maxWidth: { xs: "90%", sm: "80%", md: "70%" },
                    backgroundColor:
                      message.type === "user"
                        ? "rgba(48, 111, 182, 0.08)"
                        : "var(--color-background)",
                    border:
                      message.type === "assistant"
                        ? "1px solid var(--color-other-border)"
                        : "1px solid rgba(48, 111, 182, 0.2)",
                    borderRadius: 3,
                    boxShadow:
                      message.type === "assistant"
                        ? "0 8px 32px rgba(0,0,0,0.08)"
                        : "0 4px 16px rgba(48, 111, 182, 0.1)",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "var(--color-text)",
                      lineHeight: 1.6,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      fontFamily: "var(--font-poppins)",
                    }}
                  >
                    {message.content}
                  </Typography>
                  {message.isStreaming && (
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CircularProgress
                        size={12}
                        sx={{ color: "var(--color-icon)" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "var(--color-subtext)",
                          fontStyle: "italic",
                          fontFamily: "var(--font-poppins)",
                        }}
                      >
                        AI is thinking...
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            ))}
          </Box>
        ) : (
          /* Empty State with Suggestions */
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Fade in={showSuggestions} timeout={800}>
              <Box sx={{ width: "100%", maxWidth: "800px" }}>
                {/* Input Area */}
                <Paper
                  elevation={4}
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    backgroundColor: "var(--color-background)",
                    border: "2px solid var(--color-other-border)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    transition: "all 0.2s ease",
                    "&:focus-within": {
                      border: "2px solid var(--color-navbar-border)",
                      boxShadow: "0 12px 40px rgba(48, 111, 182, 0.15)",
                    },
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      p: { xs: 1.5, sm: 2 },
                      gap: 1,
                    }}
                  >
                    <TextField
                      ref={inputRef}
                      fullWidth
                      multiline
                      maxRows={4}
                      value={input}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder={getPlaceholderText()}
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon
                              sx={{
                                color: "var(--color-subtext)",
                                ml: 1,
                                fontSize: "1.2rem",
                              }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          fontSize: { xs: "1rem", sm: "1.1rem" },
                          px: 2,
                          py: 1.5,
                          fontFamily: "var(--font-poppins)",
                          color: "var(--color-text)",
                          "& input::placeholder": {
                            color: "var(--color-subtext)",
                            opacity: 1,
                          },
                          "& textarea::placeholder": {
                            color: "var(--color-subtext)",
                            opacity: 1,
                          },
                        },
                      }}
                      disabled={isLoading}
                    />

                    <Stack direction="row" spacing={1} sx={{ pb: 1.5 }}>
                      <IconButton
                        onClick={toggleMic}
                        disabled={isLoading}
                        sx={{
                          color: micActive ? "#e53e3e" : "var(--color-subtext)",
                          backgroundColor: micActive
                            ? "rgba(229, 62, 62, 0.1)"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: micActive
                              ? "rgba(229, 62, 62, 0.2)"
                              : "rgba(112, 112, 112, 0.1)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        {micActive ? <MicIcon /> : <MicOffIcon />}
                      </IconButton>

                      <IconButton
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        sx={{
                          backgroundColor:
                            input.trim() && !isLoading
                              ? "var(--color-link-button)"
                              : "var(--color-other-border)",
                          color:
                            input.trim() && !isLoading
                              ? "white"
                              : "var(--color-subtext)",
                          "&:hover": {
                            backgroundColor:
                              input.trim() && !isLoading
                                ? "var(--color-navbar-border)"
                                : "var(--color-other-border)",
                          },
                          "&:disabled": {
                            backgroundColor: "var(--color-other-border)",
                            color: "var(--color-subtext)",
                          },
                          transition: "all 0.2s ease",
                          boxShadow:
                            input.trim() && !isLoading
                              ? "0 4px 14px rgba(0, 83, 204, 0.3)"
                              : "none",
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress
                            size={20}
                            sx={{ color: "inherit" }}
                          />
                        ) : (
                          <SendIcon />
                        )}
                      </IconButton>
                    </Stack>
                  </Box>
                </Paper>
                <Typography
                  variant="h6"
                  sx={{
                    color: "var(--color-text)",
                    mt: 4,
                    mb: 4,
                    textAlign: "center",
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 500,
                  }}
                >
                  Try asking about these topics:
                </Typography>
                <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
                  {suggestionQuestions.map((question) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <Paper
                        elevation={2}
                        sx={{
                          p: { xs: 2.5, sm: 3 },
                          borderRadius: 3,
                          cursor: "pointer",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          backgroundColor: "var(--color-background)",
                          border: "1px solid var(--color-other-border)",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
                            border: "1px solid var(--color-navbar-border)",
                          },
                        }}
                        onClick={() => handleSuggestionClick(question.text)}
                      >
                        <Stack spacing={1}>
                          <Stack direction="row" alignItems="center"></Stack>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "var(--color-text)",
                              fontWeight: 500,
                              lineHeight: 1.4,
                              fontSize: { xs: "0.9rem", sm: "0.95rem" },
                              fontFamily: "var(--font-poppins)",
                            }}
                          >
                            {question.text}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Fade>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ChatInterface;
