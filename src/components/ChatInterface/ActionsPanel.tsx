import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { SVGProps } from "react";
import React from "react";

interface QuickAction {
  id: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

interface Props {
  actions: QuickAction[];
}

const ActionsPanel: React.FC<Props> = ({ actions }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery("(max-width:400px)");

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 1.5, sm: 2 },
          borderRadius: 2,
          height: { xs: "auto", lg: "100%" },
          minHeight: { xs: "auto", lg: 400 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            mb: { xs: 1.5, sm: 2 },
            fontSize: { xs: "1rem", sm: "1.1rem" },
          }}
        >
          Quick Actions
        </Typography>

        <Paper
          sx={{
            p: { xs: 1, sm: 1.5, md: 2 },
            borderRadius: 2,
            flexGrow: 1,
            overflow: "hidden",
          }}
          elevation={0}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: isExtraSmall ? "column" : "row",
                sm: isMobile ? "row" : "column",
                lg: "column",
              },
              gap: { xs: 1, sm: 1.5, md: 2 },
              flexWrap: {
                xs: isExtraSmall ? "nowrap" : "wrap",
                sm: isMobile ? "wrap" : "nowrap",
                lg: "nowrap",
              },
              overflowX: {
                xs: isExtraSmall ? "hidden" : "auto",
                sm: isMobile ? "hidden" : "hidden",
                lg: "hidden",
              },
              overflowY: {
                xs: "hidden",
                lg: "auto",
              },
              maxHeight: {
                xs: "none",
                lg: 400,
              },
              width: "100%",
            }}
          >
            {actions.map((a) => {
              const Icon = a.icon;
              return (
                <Button
                  key={a.id}
                  variant="outlined"
                  size={isExtraSmall ? "small" : "medium"}
                  onClick={() => console.log(a.id)}
                  sx={{
                    color: "var(--color-text)",
                    textTransform: "none",
                    fontWeight: 500,
                    justifyContent: {
                      xs: isExtraSmall ? "center" : "flex-start",
                      sm: isMobile ? "center" : "flex-start",
                      lg: "flex-start",
                    },
                    gap: { xs: 1, sm: 1.5 },
                    flex: {
                      xs: isExtraSmall ? "1 1 auto" : "0 0 auto",
                      sm: isMobile ? "1 1 calc(50% - 8px)" : "0 0 auto",
                      lg: "0 0 auto",
                    },
                    minWidth: {
                      xs: isExtraSmall ? "auto" : 140,
                      sm: isMobile ? "auto" : 140,
                      lg: 140,
                    },
                    width: {
                      xs: isExtraSmall ? "100%" : "auto",
                      sm: isMobile ? "auto" : "100%",
                      lg: "100%",
                    },
                    fontSize: {
                      xs: "0.75rem",
                      sm: "0.875rem",
                    },
                    py: { xs: 1, sm: 1.25 },
                    px: { xs: 1, sm: 1.5 },
                    borderRadius: 1.5,
                    "&:hover": {
                      backgroundColor: "action.hover",
                      borderColor: "primary.main",
                    },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  startIcon={
                    <Icon
                      style={{
                        width: isExtraSmall ? 16 : 18,
                        height: isExtraSmall ? 16 : 18,
                        marginLeft: isExtraSmall ? 0 : 5,
                        flexShrink: 0,
                      }}
                    />
                  }
                >
                  <Box
                    component="span"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                    }}
                  >
                    {a.label}
                  </Box>
                </Button>
              );
            })}
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
};

export default ActionsPanel;
