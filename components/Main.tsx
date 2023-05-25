import * as React from 'react';
import { useEffect, useRef } from "react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

export default function CustomImageList() {
  const playerRef1 = useRef<Player>(null);
  const playerRef2 = useRef<Player>(null);
  const [onWelcome, setOnWelcome] = React.useState(false);
  const [on, setOn] = React.useState(false);

  const handle = (toggle: boolean) => {
    setOnWelcome(toggle);
    setOn(toggle)
  }

  useEffect(() => {
    if (!playerRef1.current) {
      return;
    }
    if (onWelcome) {
      playerRef1.current.play();
    } else {
      playerRef1.current.stop();
    }
  }, [onWelcome]);

  useEffect(() => {
    if (!playerRef2.current) {
      return;
    }
    if (on) {
      playerRef2.current.play();
    } else {
      playerRef2.current.stop();
    }
  }, [on]);

  const router = useRouter();

  const handleAnimationComplete = () => {
    setTimeout(() => {
      router.push('/menus');
    }, 1500);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Player ref={playerRef1} speed={2.8} keepLastFrame src="./animation/welcome.json"
      style={{ position: 'absolute', height: '100%', width: '100%'}}
      autoplay={true}
      onEvent={(event) => {console.log(event);if (event === 'play') handleAnimationComplete();}}
      />
      <Player ref={playerRef2} speed={1.8} keepLastFrame src="./animation/1370-confetti.json"
      autoplay={true}
      />
    </div>
  );
}