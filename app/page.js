"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Scale,
  Briefcase,
  Binoculars,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    caseType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll contact you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          caseType: "",
        });
      } else {
        toast.error(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // ======================================================================================================================================================================

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              {/* <Scale className="h-8 w-8 text-primary" /> */}
              <img
                src="/images/mv-logo.png" 
                alt="MV Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold">MV & Associates</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("practice-areas")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Practice Areas
              </button>
              <button
                onClick={() => scrollToSection("partners")}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Partners
              </button>
              <Link
                href="/blog"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Blog
              </Link>
              <Button onClick={() => scrollToSection("contact")} size="sm">
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("practice-areas")}
                  className="text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  Practice Areas
                </button>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  Testimonials
                </button>
                <Link
                  href="/blog"
                  className="text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  Blog
                </Link>
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="sm"
                  className="w-full"
                >
                  Contact
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-20 pb-12 md:pt-20 md:pb-20 bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
                20+ Years of Legal Excellence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Legal Expertise Built On Trust And Results.
              </h1>
              <p className="text-lg text-muted-foreground">
                Your case, our priority - Protecting what matters and achieving
                results you can rely on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="group"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  className="border-white/50 focus:border-primary focus:ring-primary"
                  variant="outline"
                  onClick={() => scrollToSection("about")}
                >
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Cases Won</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl p-4 sm:p-6 md:p-8 flex items-center justify-center">
                {/* bg-gradient-to-br from-primary/20 to-primary/5 */}
                {/* <Scale className="h-48 w-48 text-primary opacity-20" /> */}
                <img
                  src="/images/MV_Logo.png"
                  alt="Meher Parihar"
                  className=" object-cover border-2 border-yellow-100 shadow"
                />
              </div>
              <div className="absolute -bottom-[-100] -right-4 bg-card border border-border rounded-lg p-4 shadow-lg border-2 border-red-500">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <div>
                    <div className="font-bold">5.0 Rating</div>
                    <div className="text-xs text-muted-foreground">
                      200+ Reviews
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About MV & Associates
            </h2>
            <p className="text-lg text-muted-foreground">
              A passionate advocate with over two decades of experience
              delivering exceptional legal representation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Background</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Ivory Mitchell is a distinguished attorney with over 20
                    years of experience in civil litigation, family law, and
                    business law. She graduated summa cum laude from Harvard Law
                    School and has since built a reputation for her meticulous
                    attention to detail and unwavering commitment to her
                    clients.
                  </p>
                  <p className="text-muted-foreground">
                    Her approach combines aggressive advocacy with compassionate
                    counsel, ensuring that each client receives personalized
                    attention and strategic legal solutions tailored to their
                    unique circumstances.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Education</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>J.D., Harvard Law School (Summa Cum Laude)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>B.A. Political Science, Yale University</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle>Certifications & Memberships</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>State Bar Association - Certified Specialist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>American Bar Association Member</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>National Association of Trial Lawyers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section id="practice-areas" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Range Of Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive legal services across multiple practice areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Business Law</CardTitle>
                <CardDescription>
                  Comprehensive legal support for businesses of all sizes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Contract drafting and review </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Business formation and dissolution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Partnership agreements </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Commercial litigation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Family Law</CardTitle>
                <CardDescription>
                  Compassionate guidance through family legal matters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Legal Consultancy</div>
                    <ul className="mt-3 space-y-1 pl-5 list-disc">
                      <li>Divorce (Mutual & Contested)</li>
                      <li>Maintenance, Alimony & Domestic Violence Matters</li>
                      <li>Child Custody & Guardianship</li>
                      <li>Dowry & NRI Matrimonial Disputes</li>
                      <li>Judicial Separation & Annulment</li>
                      <li>Legal Notices, Petitions & Settlement Drafting</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">
                      Mediation & Dispute Resolution
                    </div>
                    <ul className="mt-3 space-y-1 pl-5 list-disc">
                      <li>Pre-litigation & Court-Referred Mediation</li>
                      <li>Marital Reconciliation</li>
                      <li>Negotiation & Structured Settlements</li>
                      <li>Online Dispute Resolution</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Legal Advisory</div>
                    <ul className="mt-3 space-y-1 pl-5 list-disc">
                      <li>Matrimonial Rights & Property Advisory</li>
                      <li>Stridhan & Financial Rights Guidance</li>
                      <li>Strategic Case Planning</li>
                      <li>Preventive Legal Consultation</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Matrimonial Counseling</div>
                    <ul className="mt-3 space-y-1 pl-5 list-disc">
                      <li>Pre-Marital Guidance</li>
                      <li>Conflict Resolution Sessions</li>
                      <li>Reconciliation Facilitation</li>
                      <li>Post-Separation & Co-Parenting Support</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Civil Litigation</CardTitle>
                <CardDescription>
                  Strong advocacy in civil disputes and litigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Personal injury claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Employment disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Property disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Breach of contract</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Estate Planning</CardTitle>
                <CardDescription>
                  Protect your legacy and secure your family's future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Wills and trusts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Power of attorney</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Probate administration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Asset protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real Estate Law</CardTitle>
                <CardDescription>
                  Expert guidance for property transactions and disputes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Property transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Lease agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Title disputes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Zoning issues</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Criminal Defense</CardTitle>
                <CardDescription>
                  Aggressive defense of your rights and freedom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>DUI/DWI defense</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>White collar crimes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Drug offenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Assault and battery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <Binoculars className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Investigation Services</CardTitle>
                <CardDescription>
                  Background & due diligence checks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Corporate and fraud investigations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Surveillance & evidence gathering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Asset tracing & financial inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Litigation support & witness verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Matrimonial and cyber investigations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 ">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Partners</h2>
            <p className="text-lg text-muted-foreground">
              Your Legal Partners in Every Step
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center">
              {/* Card 1 */}
              <Card className="w-full max-w-md mx-auto rounded-xl shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 flex items-center gap-5">
                  <img
                    src="/images/adv_profile.jpg"
                    alt="Vijaishree Tiwari"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                  />

                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Adv. Vijaishree Tiwari
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Senior Advocate
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 */}
              <Card className="w-full max-w-md mx-auto rounded-xl shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 flex items-center gap-5">
                  <img
                    src="/images/adv_profile.jpg"
                    alt="Meher Parihar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
                  />

                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Adv. Meher Parihar
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Senior Advocate
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-lg">Exceptional Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "Ivory handled my divorce case with incredible professionalism and compassion. She fought tirelessly for my children's best interests and achieved an outcome that exceeded my expectations."
                </p>
                <div className="font-medium">- Jennifer R.</div>
                <div className="text-sm text-muted-foreground">Family Law Client</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-lg">Outstanding Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "As a small business owner, I needed expert legal guidance for contract negotiations. Ivory's attention to detail and strategic thinking saved me from a potentially costly mistake."
                </p>
                <div className="font-medium">- Michael T.</div>
                <div className="text-sm text-muted-foreground">Business Law Client</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <CardTitle className="text-lg">Highly Recommended</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  "I was involved in a serious personal injury case and Ivory's aggressive advocacy secured a settlement that will provide for my medical care for years to come. I can't thank her enough."
                </p>
                <div className="font-medium">- David K.</div>
                <div className="text-sm text-muted-foreground">Civil Litigation Client</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Connect With Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Book your consultation and begin your path to a legal solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-muted-foreground">
                        +91 8602184060
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Mon-Fri: 9AM - 6PM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-muted-foreground">
                        {" "}
                        mv.associates.legal@gmail.com
                      </div>
                      {/* <div className="text-sm text-muted-foreground">We'll respond within 24 hours</div> */}
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <div className="font-medium">Office Address</div>
                      <div className="text-muted-foreground">
                        {" "}
                        323 B - Rajul landmark, Napier Town,
                      </div>
                      <div className="text-muted-foreground">
                        Jabalpur, Madhya Pradesh, 482001
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="font-medium">12:00 AM - 6:00 PM</span>
                  </div>
                  <div className="pt-4 border-t border-primary-foreground/80">
                    <p className="text-sm">
                      Emergency consultations available by appointment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="caseType">Case Type</Label>
                    <select
                      id="caseType"
                      name="caseType"
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a case type</option>
                      <option value="business">Business Law</option>
                      <option value="family">Family Law</option>
                      <option value="civil">Civil Litigation</option>
                      <option value="estate">Estate Planning</option>
                      <option value="realestate">Real Estate Law</option>
                      <option value="criminal">Criminal Defense</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your legal matter..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-white/50 focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Scale className="h-6 w-6 text-primary" />
                <span className="font-bold">MV & Associates</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Providing exceptional legal services with integrity, dedication,
                and results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-primary transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("practice-areas")}
                    className="hover:text-primary transition-colors"
                  >
                    Practice Areas
                  </button>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Practice Areas</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Business Law</li>
                <li>Family Law</li>
                <li>Civil Litigation</li>
                <li>Estate Planning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Phone no. : +91 8602184060</li>
                <li>Email : mv.associates.legal@gmail.com</li>
                <li>Address : </li>
                <li>323 B - Rajul landmark, Napier Town,</li>
                <li>Jabalpur, Madhya Pradesh, 482001</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-center md:text-left text-sm text-muted-foreground">
                © 2024 MV & Associates. All rights reserved. | Attorney
                Advertising
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
