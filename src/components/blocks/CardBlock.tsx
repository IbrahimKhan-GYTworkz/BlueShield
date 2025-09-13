import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import type { CardBlock } from "../../types/contentBlocks";

const CardBlockComp: React.FC<CardBlock> = ({
  icon: Icon,
  title,
  subtitle,
  metadata,
  description,
  actions,
}) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400));

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: { xs: 1, sm: 2, md: 3 },
        my: { xs: 1, sm: 1.5, md: 2, lg: 2.5 },
        mx: { xs: 0.5, sm: 0 },
        boxShadow: 0,
        overflow: "visible", // Changed from "hidden" to prevent clipping
        width: "100%",
        maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%" }, // Responsive maxWidth
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: { xs: 0, sm: 1 },
          transform: { xs: "none", sm: "translateY(-1px)" },
        },
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: 1.25,
            sm: 1.75,
            md: 2.25,
            lg: 2.5,
            xl: 3,
          },
          "&:last-child": {
            pb: {
              xs: 1.25,
              sm: 1.75,
              md: 2.25,
              lg: 2.5,
              xl: 3,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            alignItems: {
              xs: "center",
              sm: "flex-start",
              md: "flex-start",
            },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          {/* Icon in rounded square */}
          {Icon && (
            <Box
              sx={{
                width: { xs: 32, sm: 36, md: 40, lg: 44 },
                height: { xs: 32, sm: 36, md: 40, lg: 44 },
                bgcolor: "#e3f2fd",
                borderRadius: { xs: 1, sm: 1.25, md: 1.5 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                mt: { xs: 0, sm: 0.5 }, // Small top margin for better alignment
              }}
            >
              <Icon
                size={isExtraSmall ? 16 : isSmall ? 18 : isMedium ? 20 : 22}
                color="#1976d2"
              />
            </Box>
          )}

          {/* Text content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              overflow: "hidden", // Prevent content from overflowing
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: { xs: 600, md: 700 },
                fontSize: {
                  xs: "0.9rem",
                  sm: "0.95rem",
                  md: "1.05rem",
                  lg: "1.1rem",
                  xl: "1.2rem",
                },
                lineHeight: { xs: 1.3, sm: 1.4 },
                mb:
                  subtitle || metadata || description
                    ? { xs: 0.4, sm: 0.5 }
                    : 0,
                wordBreak: "break-word",
                overflowWrap: "break-word", // Ensure long words break properly
                textAlign: { xs: "center", sm: "left" }, // Simplified text alignment
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: {
                    xs: "0.78rem",
                    sm: "0.83rem",
                    md: "0.875rem",
                    lg: "0.9rem",
                  },
                  lineHeight: { xs: 1.3, sm: 1.4 },
                  mb: metadata || description ? { xs: 0.4, sm: 0.5 } : 0,
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {subtitle}
              </Typography>
            )}

            {/* Metadata */}
            {metadata && (
              <Box
                sx={{
                  mt: 0.5,
                  mb: description ? { xs: 0.4, sm: 0.5 } : 0,
                }}
              >
                {Object.entries(metadata).map(([k, v], index) => (
                  <Typography
                    key={k}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: index > 0 ? { xs: 0.25, sm: 0.3 } : 0,
                      fontSize: {
                        xs: "0.72rem",
                        sm: "0.75rem",
                        md: "0.8rem",
                      },
                      lineHeight: { xs: 1.3, sm: 1.4 },
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    {v}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Description */}
            {description && (
              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  color: "#1976d2",
                  mt: 0.5,
                  mb: actions && actions.length > 0 ? { xs: 0.75, sm: 1 } : 0,
                  fontSize: {
                    xs: "0.72rem",
                    sm: "0.75rem",
                    md: "0.8rem",
                  },
                  lineHeight: { xs: 1.3, sm: 1.4 },
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {description}
              </Typography>
            )}

            {/* Actions */}
            {actions && actions.length > 0 && (
              <Box
                sx={{
                  mt: { xs: 1, sm: 1.25, md: 1.5 },
                  display: "flex",
                  gap: { xs: 0.75, sm: 1, md: 1.5 },
                  flexDirection: { xs: "column", sm: "row" },
                  flexWrap: "wrap",
                  justifyContent: {
                    xs: "center",
                    sm: "flex-start",
                  },
                  width: "100%",
                }}
              >
                {actions.map((a) => (
                  <Button
                    key={a.actionId}
                    variant="outlined"
                    color="primary"
                    size={isExtraSmall ? "small" : isSmall ? "small" : "medium"}
                    sx={{
                      textTransform: "none",
                      borderRadius: { xs: 1.5, sm: 2 },
                      fontSize: {
                        xs: "0.72rem",
                        sm: "0.8rem",
                        md: "0.875rem",
                      },
                      px: { xs: 1.5, sm: 2, md: 3 },
                      py: { xs: 0.4, sm: 0.6, md: 0.75 },
                      minWidth: { xs: "100%", sm: "auto" }, // Full width on xs, auto on larger
                      flex: { xs: 1, sm: "0 0 auto" },
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                      },
                    }}
                    onClick={() => console.log(`Action: ${a.actionId}`)}
                  >
                    {a.label}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardBlockComp;
