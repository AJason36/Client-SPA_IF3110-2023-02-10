import * as React from "react"
import "./index.css"
import { Routes, Route, Navigate } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage"
import BookList from "./pages/MyBookList"
import { RouteProps } from "./types/route";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BookDetail from "./pages/BookDetail";
import PremiumBookList from "./pages/PremiumBookList";
import SubscriptionRequestPage from "./pages/SubscriptionRequest";
import CollectionList from "./pages/CollectionList";
import { JsxEmit } from "typescript";
import { Payload, getAuthData } from "./utils/auth";
import NotFound from "./pages/NotFound";
import UnauthorizedPage from "./pages/Unauthorized";
import MyBookList from "./pages/MyBookList";
import { get } from "http";

interface Book {
  book_id: number;
  name: string;
}
interface BookPremium {
  book_id: number;
  name: string;
  author: string;
}

const sampleBooks: Book[] = [
  { book_id: 1, name: 'Laskar Pelangi' },
  { book_id: 2, name: 'The Lord Of The Rings' },
  { book_id: 3, name: 'Harry Potter' },
];

const premiumBooks: BookPremium[] = [
  { book_id: 1, name: 'Laskar Pelangi',author:'John Doe' },
  { book_id: 2, name: 'The Lord Of The Rings',author:'John Doe' },
  { book_id: 3, name: 'Harry Potter',author:'John Doe' },
];

// Sample Data for User-related components
interface User {
  user_id: number;
  username: string;
}

const sampleUsers: User[] = [
  { user_id: 1, username: 'JohnDoe' },
  { user_id: 2, username: 'JaneDoe' },
  { user_id: 3, username: 'Alice' },
];

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
// Sample Data for BookDetail component
const bookDetail: BookInfo = {
  title: 'Cerita Sang Pembelajar',
publisher: 'John Doe',
year: 2017,
genre: 'Fiksi',
text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  audio: 'sample_audio.mp3',
};

const info: Details = { details :bookDetail };

function App() {
  const ProtectedRoute = ({
    redirectPath = "/notfound",
    unauthPath="/unauthorized",
    children,
    routeType,
  }: RouteProps): JSX.Element => { 
    if (localStorage.getItem("token") === null) {
      return (
        <>
          <Navigate to="/login" />;
        </>
      );
    } else {
      let isCurator = false;
      const payload: Payload = getAuthData();
      if (payload) {
        isCurator = payload.role.toString() ==="curator";
      }
      if (isCurator === routeType) {
        if (routeType === false) {
          if (payload.username) {
            return children;
          } else {
            return <Navigate to={redirectPath} />;
          }
        }
        return children;
      } else {
        return (
          <>
            <Navigate to={unauthPath} />;
          </>
        );
      }
    }
  }
  return (
    <div className="App">
      <Routes>
        {/* Common Routes */}
        {!getAuthData().username ?
          <>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          </>
        :null}
        <Route path="/register" element={<RegisterPage />} />

        {/* Author Routes */}
        <Route path="/my-book" element={
          <ProtectedRoute routeType={false} >
            <MyBookList books={sampleBooks}/>
          </ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute routeType={false}>
            <AddBookPage />
          </ProtectedRoute>
        } />

        <Route path="/book/details" element={
          <ProtectedRoute routeType={false} >
            <BookDetail details={bookDetail} />
          </ProtectedRoute>
        }/>

        {/* Curator Routes */}
        {/* Premium Book Routes */}
        <Route path="/premium-book" element={
          <ProtectedRoute routeType={true} >
            <PremiumBookList books={premiumBooks} />
          </ProtectedRoute>
        } />

        {/* Collection Routes */}
        <Route path="/collection" element={
          <ProtectedRoute routeType={true}>
            <CollectionList books={premiumBooks} />
          </ProtectedRoute>
        } />

        {/* Subscription Request Routes */}
        <Route path="/subs-request" element={
          <ProtectedRoute routeType={true}>
            <SubscriptionRequestPage users={sampleUsers} />
          </ProtectedRoute>
        } />
        
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </div >
  )
}

export default App;
