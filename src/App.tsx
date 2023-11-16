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
import EditBookPage from "./pages/EditBookPage";

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
        <Route path="/book-details" element={<BookDetail />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Author Routes */}
        <Route path="/my-book" element={
          <ProtectedRoute routeType={false} >
            <MyBookList />
          </ProtectedRoute>
        } />

        <Route path="/add" element={
          <ProtectedRoute routeType={false}>
            <AddBookPage />
          </ProtectedRoute>
        } />

        <Route path="/edit-book/" element={
          <ProtectedRoute routeType={false} >
            <EditBookPage />
          </ProtectedRoute>
        }/>

        {/* Curator Routes */}
        {/* Premium Book Routes */}
        <Route path="/premium-book" element={
          <ProtectedRoute routeType={true} >
            <PremiumBookList />
          </ProtectedRoute>
        } />

        {/* Collection Routes */}
        <Route path="/collection" element={
          <ProtectedRoute routeType={true}>
            <CollectionList />
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
