// src/components/ResponsePanel.tsx
import {
  Box,
  Paper,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import type { ContentBlock } from "../../types/contentBlocks";
import ContentRenderer from "../ContentRenderer";

interface Props {
  queryText: string;
  activeTab: number;
  onTabChange: (newIndex: number) => void;
  answerBlocks: ContentBlock[];
  sources?: ContentBlock[]; // you can treat sources as blocks too
  images?: string[]; // simple image urls
  videos?: string[]; // video urls or ids
}

const ResponsePanel: React.FC<Props> = ({
  queryText,
  activeTab,
  onTabChange,
  answerBlocks,
  sources = [],
  images = [],
  videos = [],
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:400px)");

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.5, sm: 2 },
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
            p: { xs: 1, sm: 2 },
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
            <Tab label="Answer" />
            <Tab label="Sources" />
            <Tab label="Video" />
            <Tab label="Images" />
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
                <ContentRenderer blocks={answerBlocks} />
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
                  <ContentRenderer blocks={sources} />
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
                {videos.length === 0 ? (
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
                {images.length === 0 ? (
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
