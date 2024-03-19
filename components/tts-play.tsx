"use client";

import { GenerateSoundForm } from "@/components/GenerateSoundForm";
import Loader from "@/components/Loader";
import { use, useEffect, useState } from "react";
import SOUND_MODELS, { SoundModel } from "@/lib/constants";
import { set } from "react-hook-form";

export default function TTSPlay({
  toSpeech,
  play,
}: {
  toSpeech: string;
  play: boolean;
}) {
  // State to manage loading status and audio URL
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [toPlay, setToPlay] = useState(play);

  useEffect(() => {
    if (toPlay === true) {
      handleGetAudio();
    } else {
      setAudioUrl(null);
    }
    console.log("toplay", toPlay);
  }, [toPlay]);

  useEffect(() => {
    setToPlay(play);
  }, [play]);

  const handleGetAudio = async () => {
    setIsLoading(true);

    try {
      // Make a POST request to the server's API endpoint to generate audio
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: toSpeech,
          modelUrl: SOUND_MODELS[0].url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio data.");
      }

      // Get the audio data as an ArrayBuffer
      const data = await response.arrayBuffer();

      // Convert ArrayBuffer to Blob and create a URL for the audio
      const blob = new Blob([data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="h-full flex justify-center items-center">
        {isLoading ? (
          // Show loader when fetching audio data
          <p>loading...</p>
        ) : (
          // Display audio player when audio is available
          <>
            {audioUrl && (
              <audio autoPlay controls>
                <source id="audioSource" type="audio/flac" src={audioUrl!} />
              </audio>
            )}
          </>
        )}
      </div>
    </div>
  );
}
