import * as React from "react"
import "./index.css"
// import { colors } from "./global"
// import {
//   ChakraProvider,
//   Box,
//   Text,
//   Link,
//   VStack,
//   Code,
//   Grid,
//   theme,
// } from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
// import { Logo } from "./Logo"
import { Routes, Route, Navigate } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage"
import BookList from "./pages/MyBookList"
import { CustomRouteProps } from "./types/route";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BookDetail from "./pages/BookDetail";
import PremiumBookList from "./pages/PremiumBookList";
import SubscriptionRequestPage from "./pages/SubscriptionRequest";
import CollectionList from "./pages/CollectionList";

const ProtectedRoute = ({
  redirectPath = "/notfound",
  path,
  children,
  routeType,
}: CustomRouteProps): JSX.Element => {
  return (
    <div>
      </div>
  );
};

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

// Sample Data for BookDetail component
const bookDetail: BookPremium = { book_id: 1, name: 'Action', author: 'John Doe' };

export const App = () => (
  <div className="App">
    <Routes>
           {/* Common Routes */}
      <Route path="/add" element={<AddBookPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Book Routes */}
      <Route path="/book" element={<BookList books={sampleBooks} />} />
      {/* <Route path="/book/:book_id" element={<BookDetail details={bookDetail} />} /> */}

      {/* Premium Book Routes */}
      <Route path="/premium-book" element={<PremiumBookList books={premiumBooks} />} />

      {/* Collection Routes */}
      <Route path="/collection" element={<CollectionList books={premiumBooks} />} />

      {/* Subscription Request Routes */}
      <Route path="/subs-request" element={<SubscriptionRequestPage users={sampleUsers} />} />
    </Routes>
  </div>
)
