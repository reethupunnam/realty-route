
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Home, Map, Calendar, User, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    password: "", 
    confirmPassword: "" 
  });
  const { toast } = useToast();

  // Mock user database (in a real app, this would be in a backend)
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    
    // Check if user exists and password is correct
    const user = users.find(u => u.email === signInData.email);
    
    if (user && user.password === signInData.password) {
      toast({
        title: "Signed in successfully",
        description: `Welcome back, ${user.name}!`,
      });
      setIsSignInOpen(false);
      setSignInData({ email: "", password: "" });
      // In a real app, set authentication state here
    } else {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email === signUpData.email)) {
      toast({
        title: "Email already registered",
        description: "Please use a different email address",
        variant: "destructive"
      });
      return;
    }

    // Indian phone number validation
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    if (!phoneRegex.test(signUpData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Indian phone number (e.g., +91 9876543210)",
        variant: "destructive",
      });
      return;
    }
    
    // Add new user to the "database"
    const newUser = {
      id: Date.now().toString(),
      name: signUpData.name,
      email: signUpData.email,
      phone: signUpData.phone,
      password: signUpData.password,
      createdAt: new Date().toISOString()
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Store in localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Account created successfully",
      description: "You can now sign in with your credentials",
    });
    
    setIsSignUpOpen(false);
    setSignUpData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-6 w-6 text-realty-600" />
              <span className="ml-2 text-xl font-bold text-realty-800">RealtyRoute</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-realty-600 font-medium">
              Home
            </Link>
            <Link to="/properties" className="text-gray-700 hover:text-realty-600 font-medium">
              Properties
            </Link>
            <Link to="/appointments" className="text-gray-700 hover:text-realty-600 font-medium">
              Appointments
            </Link>
            <div className="relative w-64">
              <Input 
                placeholder="Search properties..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button 
              variant="outline" 
              className="border-realty-600 text-realty-600 hover:bg-realty-50"
              onClick={() => setIsSignInOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              variant="default" 
              className="bg-realty-600 hover:bg-realty-700"
              onClick={() => setIsSignUpOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link 
              to="/" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link 
              to="/appointments" 
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Appointments
            </Link>
            <div className="relative mt-3">
              <Input 
                placeholder="Search properties..." 
                className="pl-10 w-full"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Button 
              className="mt-3 w-full border border-realty-600 text-realty-600 bg-white hover:bg-realty-50"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSignInOpen(true);
              }}
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
            <Button 
              className="mt-3 w-full bg-realty-600 hover:bg-realty-700"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSignUpOpen(true);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {/* Sign In Dialog */}
      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign In to RealtyRoute</DialogTitle>
            <DialogDescription>
              Enter your details to access your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignIn}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  name="email"
                  type="email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-realty-600 hover:bg-realty-700">
                Sign In
              </Button>
            </DialogFooter>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button 
                className="text-realty-600 hover:underline"
                onClick={() => {
                  setIsSignInOpen(false);
                  setIsSignUpOpen(true);
                }}
              >
                Sign Up
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create an Account</DialogTitle>
            <DialogDescription>
              Join RealtyRoute to save favorite properties and schedule viewings
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  name="name"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  placeholder="Raj Kumar"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-phone">Phone Number</Label>
                <Input
                  id="signup-phone"
                  name="phone"
                  value={signUpData.phone}
                  onChange={handleSignUpChange}
                  placeholder="+91 9876543210"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  name="confirmPassword"
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-realty-600 hover:bg-realty-700">
                Create Account
              </Button>
            </DialogFooter>
          </form>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <button 
                className="text-realty-600 hover:underline"
                onClick={() => {
                  setIsSignUpOpen(false);
                  setIsSignInOpen(true);
                }}
              >
                Sign In
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
