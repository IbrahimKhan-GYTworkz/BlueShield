// ChatInterface.tsx
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
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

import ActionsPanel from "./ActionsPanel";
import ResponsePanel from "./ResponsePanel";

import {
  LucideFileText,
  LucideHeartPlus,
  LucideSquareArrowOutUpRight,
  LucideUsers,
} from "lucide-react";
import { doctorSearchResponse } from "../../constants/doctorSearchResponse";
import { priorAuthResponse } from "../../constants/priorAuthResponse";
import type { ContentBlock } from "../../types/contentBlocks";

// Speech Recognition types
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: (() => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

interface Message {
  id: string;
  content: string;
  type: "user" | "assistant";
  timestamp: Date;
  isStreaming?: boolean;
}

const ChatInterface: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:400px)");

  // --- state ---
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const [viewMode, setViewMode] = useState<"chat" | "response">("chat");

  // Query state (for ResponsePanel)
  const [activeTab, setActiveTab] = useState(0);
  const [queryText, setQueryText] = useState("");
  const [answerBlocks, setAnswerBlocks] = useState<ContentBlock[]>([]);
  const [sourcesBlocks, setSourcesBlocks] = useState<ContentBlock[]>([]);
  const [imageResults, setImageResults] = useState<string[]>([]);
  const [videoResults, setVideoResults] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Initialize speech recognition
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
        setMicActive(true);
      };
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        setMicActive(false);
        inputRef.current?.focus();
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setMicActive(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        setMicActive(false);
      };
      
      recognitionRef.current = recognition;
      setSpeechSupported(true);
    } else {
      setSpeechSupported(false);
    }
  }, []);

  const suggestionQuestions = [
    { id: "1", text: "Find in-network doctors nearby." },
    { id: "2", text: "Prior authorization requirements for MRI" },
  ];

  const quickActions = [
    { id: "network", icon: LucideUsers, label: "Find My Benefits" },
    { id: "claims", icon: LucideFileText, label: "Claim Status" },
    { id: "mental", icon: LucideHeartPlus, label: "Mental Health" },
    { id: "new", icon: LucideSquareArrowOutUpRight, label: "New Conversation" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const toggleMic = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      setMicActive(false);
    } else {
      // Start listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Error starting speech recognition:', error);
          setMicActive(false);
        }
      }
    }
  };

  // Static responses for now
  const chooseStaticResponse = (query: string): ContentBlock[] => {
    const q = query.toLowerCase();
    if (
      q.includes("doctor") ||
      q.includes("in-network") ||
      q.includes("nearby")
    ) {
      return doctorSearchResponse;
    }
    if (
      q.includes("prior") ||
      q.includes("authorization") ||
      q.includes("mri")
    ) {
      return priorAuthResponse;
    }
    return [
      {
        type: "text",
        content: "Sorry — I don't have a specific response for that yet.",
      },
    ];
  };

  // --- Streaming logic ---
  const streamTextBlock = (
    fullText: string,
    otherBlocks: ContentBlock[],
  ): void => {
    let i = 0;
    const words = fullText.split(" ");
    const interval = setInterval(() => {
      i++;
      const partialText = words.slice(0, i).join(" ");
      setAnswerBlocks([{ type: "text", content: partialText }]);

      if (i >= words.length) {
        clearInterval(interval);

        // After streaming finishes, append other blocks
        if (otherBlocks.length > 0) {
          setTimeout(() => {
            setAnswerBlocks([
              { type: "text", content: fullText },
              ...otherBlocks,
            ]);
          }, 400);
        }

        setIsLoading(false);
      }
    }, 80); // adjust typing speed
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      type: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setQueryText(input.trim());
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Start response mode immediately
    setViewMode("response");

    // Simulate streaming response
    setTimeout(() => {
      const blocks = chooseStaticResponse(userMessage.content);
      const [firstBlock, ...rest] = blocks;

      if (firstBlock?.type === "text") {
        streamTextBlock(firstBlock.content, rest);
      } else {
        // If no text block, just render all at once
        setAnswerBlocks(blocks);
        setIsLoading(false);
      }

      setSourcesBlocks([]); // stubbed
      setImageResults([]); // stubbed
      setVideoResults([]); // stubbed
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
    inputRef.current?.focus();
  };

  const getPlaceholderText = () => {
    const placeholders = [
      "Ask me anything...",
      "What would you like to know?",
      "Search for information...",
      "How can I help you today?",
    ];
    const idx = Math.floor(Date.now() / 5000) % placeholders.length;
    return placeholders[idx];
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 1, sm: 2, md: 3 },
          px: { xs: 0.5, sm: 1, md: 2 },
        }}
      >
        {/* Header only in chat mode */}
        {viewMode === "chat" && (
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 2, sm: 3, md: 4 },
              px: { xs: 1, sm: 2 },
            }}
          >
            <Typography
              variant={isExtraSmall ? "h4" : isSmall ? "h3" : "h3"}
              sx={{
                fontWeight: 700,
                fontSize: {
                  xs: "1.75rem",
                  sm: "2.5rem",
                  md: "3rem",
                },
              }}
            >
              BlueShield AI
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                },
                px: { xs: 1, sm: 0 },
              }}
            >
              Ask anything, get intelligent answers powered by advanced AI
              reasoning
            </Typography>
          </Box>
        )}

        {viewMode !== "chat" && (
          /* Response Mode: Two-panel layout */
          <Grid
            container
            spacing={{ xs: 1, sm: 2 }}
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              maxWidth: "100%",
            }}
          >
            <Grid size={{ xs: 12, lg: 9 }} sx={{ 
              order: { xs: 1, lg: 1 },
              pr: { xs: 0, lg: 1 },
            }}>
              <ResponsePanel
                queryText={queryText}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                answerBlocks={answerBlocks}
                sources={sourcesBlocks}
                images={imageResults}
                videos={videoResults}
                input={input}
                onInputChange={handleInputChange}
                onInputSubmit={handleSubmit}
                onKeyPress={handleKeyPress}
                isLoading={isLoading}
                micActive={micActive}
                onToggleMic={toggleMic}
                inputRef={inputRef}
                getPlaceholderText={getPlaceholderText}
                isExtraSmall={isExtraSmall}
                isSmall={isSmall}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 3 }} sx={{ 
              order: { xs: 2, lg: 2 },
              pl: { xs: 0, lg: 1 },
            }}>
              <ActionsPanel actions={quickActions} />
            </Grid>
          </Grid>
        )}

        {/* Chat Input only in chat mode */}
        {viewMode === "chat" && (
          <Box
            sx={{
              mt: { xs: 2, sm: 3, md: 4 },
              position: "relative",
              zIndex: 10,
              backgroundColor: "var(--color-background)",
            }}
          >
            <Paper
              sx={{
                p: { xs: 1.5, sm: 2 },
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: "flex",
                  gap: { xs: 0.5, sm: 1 },
                  alignItems: "flex-end",
                  flexDirection: isExtraSmall ? "column" : "row",
                }}
              >
                <TextField
                  ref={inputRef}
                  fullWidth
                  multiline
                  maxRows={isExtraSmall ? 3 : 4}
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={getPlaceholderText()}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: !isExtraSmall && (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                      </InputAdornment>
                    ),
                    sx: {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                      px: { xs: 1, sm: 0 },
                    },
                  }}
                  disabled={isLoading}
                  sx={{
                    mb: isExtraSmall ? 1 : 0,
                  }}
                />

                <Stack
                  direction="row"
                  spacing={{ xs: 0.5, sm: 1 }}
                  sx={{
                    alignSelf: isExtraSmall ? "flex-end" : "auto",
                    width: isExtraSmall ? "100%" : "auto",
                    justifyContent: isExtraSmall ? "flex-end" : "flex-start",
                  }}
                >
                <IconButton
                  onClick={toggleMic}
                  disabled={isLoading || !speechSupported}
                  size={isExtraSmall ? "small" : "medium"}
                  sx={{
                    color: isListening ? "#ff4444" : "#9e9e9e",
                    "&:hover": {
                      backgroundColor: isListening ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  {isListening ? (
                    <MicIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                  ) : (
                    <MicOffIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
                  )}
                </IconButton>
                  <IconButton
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    size={isExtraSmall ? "small" : "medium"}
                    sx={{
                      background: input.trim()
                        ? "var(--color-link-button)"
                        : "var(--color-other-border)",
                      color: input.trim() ? "white" : "var(--color-subtext)",
                      minWidth: { xs: 36, sm: 40 },
                      minHeight: { xs: 36, sm: 40 },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={isExtraSmall ? 16 : 18}
                        sx={{ color: "inherit" }}
                      />
                    ) : (
                      <SendIcon sx={{ fontSize: { xs: 16, sm: 20 } }} />
                    )}
                  </IconButton>
                </Stack>
              </Box>
            </Paper>
          </Box>
        )}

        {viewMode === "chat" && (
          <>
            {/* Empty state suggestions if no messages yet */}
            {messages.length === 0 && (
              <Fade in={showSuggestions} timeout={600}>
                <Box
                  sx={{
                    mb: { xs: 2, sm: 3, md: 4 },
                    px: { xs: 0.5, sm: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      my: { xs: 7, sm: 7 },
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                      textAlign: { xs: "center", sm: "center" },
                    }}
                  >
                    Try asking about these topics:
                  </Typography>
                  <Grid
                    container
                    spacing={{ xs: 1.5, sm: 2 }}
                    sx={{
                      justifyContent: { xs: "center", sm: "center" },
                    }}
                  >
                    {suggestionQuestions.map((q) => (
                      <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={q.id}>
                        <Paper
                          onClick={() => handleSuggestionClick(q.text)}
                          sx={{
                            p: { xs: 1.5, sm: 2 },
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                            transition: "background-color 0.2s",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: { xs: "0.875rem", sm: "1rem" },
                              textAlign: { xs: "center", sm: "left" },
                            }}
                          >
                            {q.text}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Fade>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ChatInterface;
