import { Box, Button, Card, CardContent, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import type { CardBlock } from '../../types/contentBlocks'

const CardBlockComp: React.FC<CardBlock> = ({
  icon: Icon,
  title,
  subtitle,
  metadata,
  description,
  status,
  actions,
}) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isExtraSmall = useMediaQuery(theme.breakpoints.down(400))

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        boxShadow: 0,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: 1,
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardContent
        sx={{
          p: 1.5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            pb: 1.5,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 1.5,
            flex: 1,
            minHeight: 0,
          }}
        >
          {/* Icon in rounded square */}
          {Icon && (
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: '#e3f2fd',
                borderRadius: { xs: 1, sm: 1.25, md: 1.5 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mt: { xs: 0, sm: 0.5 }, // Small top margin for better alignment
              }}
            >
              <Icon size={16} color="#1976d2" />
            </Box>
          )}

          {/* Text content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
             <Typography
               variant="subtitle1"
               sx={{
                 fontWeight: { xs: 600, md: 700 },
                 fontSize: '0.875rem',
                 lineHeight: 1.3,
                 mb: subtitle ? 0.25 : 0,
                 wordBreak: 'break-word',
                 overflowWrap: 'break-word',
                 textAlign: 'left',
               }}
             >
               {title}
             </Typography>

             {subtitle && (
               <Typography
                 variant="body2"
                 color="text.secondary"
                 sx={{
                   fontSize: '0.75rem',
                   lineHeight: 1.3,
                   mb: 1,
                   wordBreak: 'break-word',
                   overflowWrap: 'break-word',
                   textAlign: 'left',
                 }}
               >
                 {subtitle}
               </Typography>
             )}

            {/* Metadata */}
            {metadata && (
              <Box
                sx={{
                  mb: status ? 0.25 : 0,
                }}
              >
                {Object.entries(metadata).map(([k, v], index) => (
                  <Typography
                    key={k}
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: index > 0 ? 0.125 : 0,
                      fontSize: '0.7rem',
                      lineHeight: 1.3,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      textAlign: 'left',
                    }}
                  >
                    {v}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Status */}
            {status && (
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.7rem',
                  lineHeight: 1.3,
                  color: '#1976d2',
                  fontWeight: 700,
                  mb: description ? 0.25 : 0,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  textAlign: 'left',
                }}
              >
                {status}
              </Typography>
            )}

            {/* Description */}
            {description && (
              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: '#1976d2',
                  mt: 0.25,
                  mb: actions && actions.length > 0 ? 0.5 : 0,
                  fontSize: '0.7rem',
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  textAlign: 'left',
                }}
              >
                {description}
              </Typography>
            )}

             {/* Actions */}
             {actions && actions.length > 0 && (
               <Box
                 sx={{
                   mt: 'auto',
                   pt: 1,
                   display: 'flex',
                   gap: 0.5,
                   flexDirection: 'row',
                   flexWrap: 'wrap',
                   justifyContent: 'flex-start',
                 }}
               >
                {actions.map((a) => (
                  <Button
                    key={a.actionId}
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{
                      textTransform: 'none',
                      borderRadius: '50px', // ⬅️ makes it rounded
                      fontSize: '0.7rem',
                      padding: '2px 12px', // replaces px + py
                      minWidth: 'auto',
                      flex: '0 0 auto',
                    }}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 1.5,
                      fontSize: '0.7rem',
                      px: 1.5,
                      py: 0.25,
                      pt: 1, // ✅ extra top padding
                      minWidth: 'auto',
                      flex: '0 0 auto',
                      color: 'black',
                      fontWeight: 'bold', // ✅ makes text bold
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
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
  )
}

export default CardBlockComp
