
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Zap, Shield, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">DevTrack</h1>
              <Badge variant="secondary">Beta</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Track Issues,
            <span className="text-primary"> Ship Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            DevTrack is a modern issue tracking system built for development teams. 
            Manage bugs, features, and tasks with real-time collaboration and seamless workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage issues
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  See changes instantly across your team with live synchronization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Live collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Instant notifications
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Status tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Team Collaboration</CardTitle>
                <CardDescription>
                  Built for teams with powerful assignment and tracking features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Issue assignment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Priority management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>DevOps Ready</CardTitle>
                <CardDescription>
                  Integrated CI/CD pipeline with automated testing and deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    GitHub integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automated deployment
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Monitoring & logging
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Built with Modern Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-sm">Frontend</h3>
              <p className="text-xs text-gray-600 mt-1">React + TypeScript</p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-sm">Backend</h3>
              <p className="text-xs text-gray-600 mt-1">Supabase + PostgreSQL</p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-sm">Deployment</h3>
              <p className="text-xs text-gray-600 mt-1">Vercel + GitHub Actions</p>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-sm">
              <h3 className="font-semibold text-sm">Monitoring</h3>
              <p className="text-xs text-gray-600 mt-1">Sentry + Analytics</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to streamline your workflow?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of developers using DevTrack to manage their issues efficiently
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Your Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 DevTrack. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
