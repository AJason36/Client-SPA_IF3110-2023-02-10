// BookDetail.tsx
import React, { useState } from 'react';
import "./BookDetail.css"

interface BookInfo {
  title: string;
  publisher: string;
  year: number;
  genre: string;
  text: string;
  audio: string;
}
interface Details{
    details:BookInfo;
}
const BookDetail= ({ details }: Details) => {
  const [book, setBook] = useState<BookInfo>({
    title: 'Cerita Sang Pembelajar',
    publisher: 'John Doe',
    year: 2017,
    genre: 'Fiksi',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    audio: 'sample_audio.mp3',
  });

  const playAudio = () => {
    const audioElement = new Audio(details.audio);
    audioElement.play();
  };

  return (
    <div>
        
      <h1>{details.title}</h1>
      <p>Publisher: {details.publisher}</p>
      <p>Year: {details.year}</p>
      <p>Genre: {details.genre}</p>
      <p>Text: {details.text}</p>
      <button onClick={playAudio}>Play Audio</button>
    </div>
  );
}

export default BookDetail;
