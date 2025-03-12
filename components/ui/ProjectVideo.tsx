'use client'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from '@/components/ui/morphing-dialog'

function getVideoThumbnail(videoUrl: string): string {
  // Transform Cloudinary video URL to image URL
  // Example: https://res.cloudinary.com/jiang/video/upload/v1234/video.webm
  // To: https://res.cloudinary.com/jiang/video/upload/w_1280,h_720,c_fill,q_auto,f_auto/v1234/video.jpg
  return videoUrl
    .replace('/upload/', '/upload/w_1280,h_720,c_fill,q_auto,f_auto/')
    .replace(/\.(webm|mp4)$/, '.jpg')
}

type ProjectVideoProps = {
  src: string
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  const [isIOS, setIsIOS] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))
  }, [])

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => console.error('Video playback error:', error))
    }
  }

  const handleError = (e: any) => {
    console.error('Video error:', e)
  }

  const thumbnailUrl = getVideoThumbnail(src)

  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0,
        duration: 0.3,
      }}
    >
      <MorphingDialogTrigger className="hidden md:block">
        {isIOS ? (
          <div className="aspect-video w-full cursor-zoom-in rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <Image
              src={thumbnailUrl}
              alt=""
              width={640}
              height={360}
              className="aspect-video w-full rounded-xl object-cover"
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={src}
            loop
            muted
            playsInline
            preload="none"
            onClick={handlePlay}
            onError={handleError}
            className="aspect-video w-full cursor-zoom-in rounded-xl"
          />
        )}
      </MorphingDialogTrigger>
      {isIOS ? (
        <div className="aspect-video w-full rounded-xl bg-zinc-100 md:hidden dark:bg-zinc-800">
          <Image
            src={thumbnailUrl}
            alt=""
            width={640}
            height={360}
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          preload="none"
          onClick={handlePlay}
          onError={handleError}
          className="aspect-video w-full rounded-xl md:hidden"
        />
      )}
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative aspect-video rounded-2xl bg-zinc-50 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950 dark:ring-zinc-800/50">
          {isIOS ? (
            <div className="aspect-video h-[50vh] w-full rounded-xl bg-zinc-100 md:h-[50vh] dark:bg-zinc-800">
              <Image
                src={thumbnailUrl}
                alt=""
                width={1280}
                height={720}
                className="aspect-video h-full w-full rounded-xl object-cover"
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={src}
              loop
              muted
              playsInline
              preload="none"
              onClick={handlePlay}
              onError={handleError}
              className="aspect-video h-[50vh] w-full rounded-xl md:h-[50vh]"
            />
          )}
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed top-6 right-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}
