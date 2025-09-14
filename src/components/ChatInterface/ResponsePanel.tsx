// src/components/ResponsePanel.tsx
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { MessageSquare, FileText, Play, Image } from "lucide-react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SendIcon from "@mui/icons-material/Send";
import type { ContentBlock } from "../../types/contentBlocks";
import ContentRenderer from "../ContentRenderer";
import SkeletonLoader, { 
  DoctorCardSkeleton, 
  TextContentSkeleton, 
  CardGridSkeleton, 
  SummaryTextSkeleton, 
  ActionButtonsSkeleton 
} from "../SkeletonLoader/SkeletonLoader";

interface Props {
  queryText: string;
  activeTab: number;
  onTabChange: (newIndex: number) => void;
  answerBlocks: ContentBlock[];
  sources?: ContentBlock[]; // you can treat sources as blocks too
  images?: string[]; // simple image urls
  videos?: string[]; // video urls or ids
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  micActive: boolean;
  onToggleMic: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  getPlaceholderText: () => string;
  isExtraSmall: boolean;
  isSmall: boolean;
}

const ResponsePanel: React.FC<Props> = ({
  queryText,
  activeTab,
  onTabChange,
  answerBlocks,
  sources = [],
  images = [],
  videos = [],
  input,
  onInputChange,
  onInputSubmit,
  onKeyPress,
  isLoading,
  micActive,
  onToggleMic,
  inputRef,
  getPlaceholderText,
  isExtraSmall,
  isSmall,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Typography
          variant={isExtraSmall ? "h6" : isSmall ? "h5" : "h5"}
          sx={{
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            fontSize: {
              xs: "1.1rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
            lineHeight: 1.3,
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {queryText}
        </Typography>

        <Paper
          sx={{
            p: { xs: 0.5, sm: 1 },
            borderRadius: 2,
            overflow: "hidden",
          }}
          elevation={0}
        >
          <Tabs
            value={activeTab}
            onChange={(_, val) => onTabChange(val)}
            variant={isSmall ? "scrollable" : "standard"}
            scrollButtons={isSmall ? "auto" : false}
            allowScrollButtonsMobile={isSmall}
            sx={{
              minHeight: { xs: 36, sm: 48 },
              "& .MuiTab-root": {
                minHeight: { xs: 36, sm: 48 },
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                fontWeight: 500,
                textTransform: "none",
                px: { xs: 1, sm: 2 },
                minWidth: { xs: 60, sm: 90 },
              },
              "& .MuiTabs-indicator": {
                height: 2,
              },
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <MessageSquare size={16} />
                  <span>Answer</span>
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <FileText size={16} />
                  <span>Sources</span>
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Play size={16} />
                  <span>Video</span>
                </Box>
              } 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Image size={16} />
                  <span>Images</span>
                </Box>
              } 
            />
          </Tabs>

          <Box
            sx={{
              mt: { xs: 1.5, sm: 2 },
              minHeight: { xs: 200, sm: 300 },
              overflow: "auto",
            }}
          >
            {activeTab === 0 && (
              <Box
                sx={{
                  "& > *": {
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  },
                }}
              >
                {isLoading ? (
                  <Box>
                    <TextContentSkeleton />
                    <CardGridSkeleton />
                    <SummaryTextSkeleton />
                    <ActionButtonsSkeleton />
                  </Box>
                ) : (
                  <ContentRenderer blocks={answerBlocks} />
                )}
                
                {/* Input field inside answer card */}
                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  <Box
                    component="form"
                    onSubmit={onInputSubmit}
                    sx={{
                      position: "relative",
                      border: "2px solid #e3f2fd",
                      borderRadius: 2,
                      backgroundColor: "white",
                      minHeight: 60,
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      "&:hover": {
                        borderColor: "#bbdefb",
                      },
                      "&:focus-within": {
                        borderColor: "#2196f3",
                      },
                    }}
                  >
                    {/* Text Input */}
                    <TextField
                      ref={inputRef}
                      fullWidth
                      multiline
                      maxRows={4}
                      value={input}
                      onChange={onInputChange}
                      onKeyPress={onKeyPress}
                      placeholder="Ask me: Compare plans for my family | Do I need prior auth for an MRI? | Find a doctor near me"
                      variant="standard"
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          fontSize: { xs: "0.875rem", sm: "1rem" },
                          py: 1,
                        },
                      }}
                      disabled={isLoading}
                      sx={{
                        flex: 1,
                        "& .MuiInputBase-root": {
                          "&:before": {
                            display: "none",
                          },
                          "&:after": {
                            display: "none",
                          },
                        },
                      }}
                    />

                    {/* Action Buttons */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        ml: 1,
                      }}
                    >
                      <IconButton
                        onClick={onToggleMic}
                        disabled={isLoading}
                        size="small"
                        sx={{
                          color: micActive ? "#ff4444" : "#9e9e9e",
                          "&:hover": {
                            backgroundColor: micActive ? "rgba(255, 68, 68, 0.1)" : "rgba(0, 0, 0, 0.04)",
                          },
                        }}
                      >
                        {micActive ? (
                          <MicIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <MicOffIcon sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                      
                      <IconButton
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        size="small"
                        sx={{
                          background: input.trim()
                            ? "#0053CC"
                            : "#e0e0e0",
                          color: input.trim() ? "white" : "#9e9e9e",
                          minWidth: 40,
                          minHeight: 40,
                          borderRadius: 2,
                          "&:hover": {
                            background: input.trim() ? "#003d99" : "#d5d5d5",
                          },
                        }}
                      >
                        {isLoading ? (
                          <CircularProgress
                            size={16}
                            sx={{ color: "inherit" }}
                          />
                        ) : (
                          <SendIcon sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    fontWeight: 600,
                  }}
                >
                  Sources
                </Typography>
                <Box
                  sx={{
                    "& > *": {
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    },
                  }}
                >
                  {isLoading ? (
                    <Box>
                      <TextContentSkeleton />
                      <TextContentSkeleton />
                    </Box>
                  ) : (
                    <ContentRenderer blocks={sources} />
                  )}
                </Box>
              </Box>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    fontWeight: 600,
                  }}
                >
                  Videos
                </Typography>
                {isLoading ? (
                  <Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 0,
                        paddingBottom: "56.25%", // 16:9 aspect ratio
                        overflow: "hidden",
                        borderRadius: 1,
                        mb: 2,
                      }}
                    >
                      <SkeletonLoader variant="rectangular" width="100%" height="100%" sx={{ position: "absolute", top: 0, left: 0 }} />
                    </Box>
                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 0,
                        paddingBottom: "56.25%", // 16:9 aspect ratio
                        overflow: "hidden",
                        borderRadius: 1,
                      }}
                    >
                      <SkeletonLoader variant="rectangular" width="100%" height="100%" sx={{ position: "absolute", top: 0, left: 0 }} />
                    </Box>
                  </Box>
                ) : videos.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    No videos available.
                  </Typography>
                ) : (
                  videos.map((v, i) => (
                    <Box
                      key={i}
                      sx={{
                        mb: 2,
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 0,
                          paddingBottom: "56.25%", // 16:9 aspect ratio
                          overflow: "hidden",
                          borderRadius: 1,
                        }}
                      >
                        <iframe
                          title={`video-${i}`}
                          src={v}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: "none",
                          }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            )}

            {activeTab === 3 && (
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    fontWeight: 600,
                  }}
                >
                  Images
                </Typography>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(auto-fit, minmax(120px, 1fr))",
                        sm: "repeat(auto-fit, minmax(160px, 1fr))",
                        md: "repeat(auto-fit, minmax(200px, 1fr))",
                      },
                      gap: { xs: 1, sm: 1.5 },
                      width: "100%",
                    }}
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 0,
                          paddingBottom: "75%", // 4:3 aspect ratio
                          overflow: "hidden",
                          borderRadius: 1,
                        }}
                      >
                        <SkeletonLoader variant="rectangular" width="100%" height="100%" sx={{ position: "absolute", top: 0, left: 0 }} />
                      </Box>
                    ))}
                  </Box>
                ) : images.length === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    No images available.
                  </Typography>
                ) : (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(auto-fit, minmax(120px, 1fr))",
                        sm: "repeat(auto-fit, minmax(160px, 1fr))",
                        md: "repeat(auto-fit, minmax(200px, 1fr))",
                      },
                      gap: { xs: 1, sm: 1.5 },
                      width: "100%",
                    }}
                  >
                    {images.map((src, i) => (
                      <Box
                        key={i}
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 0,
                          paddingBottom: "75%", // 4:3 aspect ratio
                          overflow: "hidden",
                          borderRadius: 1,
                          cursor: "pointer",
                          "&:hover": {
                            transform: "scale(1.02)",
                            transition: "transform 0.2s ease",
                          },
                        }}
                      >
                        <img
                          src={src}
                          alt={`image-${i}`}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          loading="lazy"
                        />
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default ResponsePanel;
