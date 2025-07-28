'use client';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export function YouTubeVideo({ videoId, title = 'YouTube video' }: YouTubeVideoProps) {
  return (
    <div className="mx-auto w-full mx-6 lg:mx-0  shadow-lg rounded-lg overflow-hidden">
      <div className="relative pb-[473px] w-full h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          width="936"
          height="473"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
} 