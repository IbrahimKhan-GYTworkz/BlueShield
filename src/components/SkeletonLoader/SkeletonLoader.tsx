import React from 'react';
import { Box, Skeleton } from '@mui/material';

interface SkeletonLoaderProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | false;
  sx?: object;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = 'text',
  width = '100%',
  height,
  animation = 'wave',
  sx = {},
}) => {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        '&::after': {
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        },
        ...sx,
      }}
    />
  );
};

// Doctor Card Skeleton
export const DoctorCardSkeleton: React.FC = () => (
  <Box
    sx={{
      border: '1px solid #e0e0e0',
      borderRadius: 2,
      p: 2,
      backgroundColor: 'white',
      minHeight: 200,
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <SkeletonLoader variant="circular" width={40} height={40} />
      <Box sx={{ ml: 2, flex: 1 }}>
        <SkeletonLoader width="60%" height={24} />
        <SkeletonLoader width="40%" height={20} sx={{ mt: 0.5 }} />
      </Box>
    </Box>
    
    <Box sx={{ mb: 2 }}>
      <SkeletonLoader width="80%" height={20} />
      <SkeletonLoader width="60%" height={20} sx={{ mt: 0.5 }} />
    </Box>
    
    <Box sx={{ mb: 2 }}>
      <SkeletonLoader width="100%" height={16} />
      <SkeletonLoader width="70%" height={16} sx={{ mt: 0.5 }} />
    </Box>
    
    <SkeletonLoader variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
  </Box>
);

// Text Content Skeleton
export const TextContentSkeleton: React.FC = () => (
  <Box sx={{ mb: 2 }}>
    <SkeletonLoader width="100%" height={24} />
    <SkeletonLoader width="95%" height={20} sx={{ mt: 0.5 }} />
    <SkeletonLoader width="85%" height={20} sx={{ mt: 0.5 }} />
    <SkeletonLoader width="90%" height={20} sx={{ mt: 0.5 }} />
    <SkeletonLoader width="75%" height={20} sx={{ mt: 0.5 }} />
  </Box>
);

// Card Grid Skeleton
export const CardGridSkeleton: React.FC = () => (
  <Box sx={{ mb: 3 }}>
    <SkeletonLoader width="60%" height={28} sx={{ mb: 2 }} />
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
        gap: 2,
      }}
    >
      <DoctorCardSkeleton />
      <DoctorCardSkeleton />
      <DoctorCardSkeleton />
    </Box>
  </Box>
);

// Summary Text Skeleton
export const SummaryTextSkeleton: React.FC = () => (
  <Box sx={{ mb: 2 }}>
    <SkeletonLoader width="100%" height={20} />
    <SkeletonLoader width="90%" height={20} sx={{ mt: 0.5 }} />
    <SkeletonLoader width="85%" height={20} sx={{ mt: 0.5 }} />
  </Box>
);

// Action Buttons Skeleton
export const ActionButtonsSkeleton: React.FC = () => (
  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
    <SkeletonLoader variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
    <SkeletonLoader variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
    <SkeletonLoader variant="rectangular" width={110} height={36} sx={{ borderRadius: 1 }} />
  </Box>
);

export default SkeletonLoader;
