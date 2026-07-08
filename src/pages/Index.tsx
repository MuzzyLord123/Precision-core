import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import EmergencyBanner from "@/components/EmergencyBanner";
import ServicesSection from "@/components/ServicesSection";
import StatsCounter from "@/components/StatsCounter";
import DeviceShowcase from "@/components/DeviceShowcase";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import RepairProcess from "@/components/RepairProcess";
import LiveRepairFeed from "@/components/LiveRepairFeed";
import PricingTeaser from "@/components/PricingTeaser";
import Testimonials from "@/components/Testimonials";
import CertificationsBar from "@/components/CertificationsBar";
import WhyMobiMedic from "@/components/WhyMobiMedic";
import MapSection from "@/components/MapSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoadAnimation from "@/components/PageLoadAnimation";
import MobileCTA from "@/components/MobileCTA";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <CustomCursor />
      {!loaded && <PageLoadAnimation onComplete={handleComplete} />}
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <EmergencyBanner />
        <ServicesSection />
        <StatsCounter />
        <DeviceShowcase />
        <BeforeAfterSlider />
        <RepairProcess />
        <LiveRepairFeed />
        <PricingTeaser />
        <Testimonials />
        <CertificationsBar />
        <WhyMobiMedic />
        <MapSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default Index;
