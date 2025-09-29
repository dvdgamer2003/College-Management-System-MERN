import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography, Card, CardContent } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import Carousel from 'react-material-ui-carousel';
import { School, People, Event } from '@mui/icons-material';
import BMSIT1 from '../assets/PCCOER-1.jpg'; 
import BMSIT2 from '../assets/PCCOER-2.jpg'; 
import BMSIT3 from '../assets/PCCOER-1.jpg'; 
import BMSIT4 from '../assets/PCCOER-2.jpg';
import { LightPurpleButton } from '../components/buttonStyles';

const images = [BMSIT1, BMSIT2, BMSIT3,BMSIT4];

const Homepage = () => {
    return (
        <MainContainer>
            <Grid container spacing={4} alignItems="center">
                {/* Image Slider Section */}
                <Grid item xs={12} md={6} className="fade-in">
                    <Carousel animation="slide" interval={3000} indicators={false}>
                        {images.map((img, index) => (
                            <StyledImage key={index} src={img} alt={`Slide ${index + 1}`} />
                        ))}
                    </Carousel>
                </Grid>

                {/* Welcome Section */}
                <Grid item xs={12} md={6} className="fade-in">
                    <StyledCard>
                        <CardContent>
                            <StyledTitle>
                                Welcome to <br /> 
                                <span style={{ color: "#6A0DAD" }}>PCCOER STUDENT MANAGEMENT</span> <br />
                                Management System
                            </StyledTitle>

                            <StyledText>
                                A one-stop solution for managing classes, student records, faculty details, and attendance.
                                Stay updated with marks, academic reports, and seamless communication.
                            </StyledText>

                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" fullWidth>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledText>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{ color: "#6A0DAD", fontWeight: "bold" }}>
                                        Sign up
                                    </Link>
                                </StyledText>
                            </StyledBox>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            {/* Key Features Section */}
            <FeatureSection className="fade-in">
                <Typography variant="h4" gutterBottom>
                    Key Features of Our System
                </Typography>
                <FeatureGrid>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} className="hover-effect">
                            {feature.icon}
                            <Typography variant="h6">{feature.title}</Typography>
                            <Typography>{feature.description}</Typography>
                        </FeatureCard>
                    ))}
                </FeatureGrid>
            </FeatureSection>

            {/* Testimonials Section */}
            <TestimonialSection className="fade-in">
                <Typography variant="h4" gutterBottom>What Our Users Say</Typography>
                <Carousel animation="slide" interval={4000} indicators={false}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} className="hover-effect">
                            <Typography variant="h6">"{testimonial.message}"</Typography>
                            <Typography variant="body2">- {testimonial.author}</Typography>
                        </TestimonialCard>
                    ))}
                </Carousel>
            </TestimonialSection>

            {/* Contact Us Section */}
            <ContactSection className="fade-in">
                <Typography variant="h4" gutterBottom>Contact Us</Typography>
                <Typography variant="body1">
                    Have questions? Reach out to us at: <strong>divyeshravane21543@gmail.com</strong>
                </Typography>
            </ContactSection>
        </MainContainer>
    );
};

export default Homepage;

/* ========== Animations ========== */
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hoverEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

/* ========== Styled Components ========== */
const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  background: white; 

  .fade-in {
    animation: ${fadeIn} 0.8s ease-in-out;
  }
`;

const StyledCard = styled(Card)`
  padding: 24px;
  border-radius: 16px;  /* Increased curve */
  background: linear-gradient(to right, #ffffff,rgb(137, 137, 226)); 
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #252525;
  font-weight: bold;
  text-align: center;
`;

const StyledText = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 16px;  /* More curved edges */
  object-fit: cover;
`;

/* Feature Section */
const FeatureSection = styled(Box)`
  text-align: center;
  margin: 50px 0;
`;

const FeatureGrid = styled(Grid)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const FeatureCard = styled(Card)`
  width: 300px;
  padding: 20px;
  text-align: center;
  background:rgb(199, 103, 231);
  box-shadow: 0px 4px 15px rgba(152, 38, 38, 0.1);
  border-radius: 16px;  /* Curved edges */
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    animation: ${hoverEffect} 0.5s ease-in-out;
  }
`;

/* Testimonials */
const TestimonialSection = styled(Box)`
  text-align: center;
  margin: 50px 0;
`;

const TestimonialCard = styled(Card)`
  padding: 20px;
  max-width: 500px;
  margin: auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    animation: ${hoverEffect} 0.5s ease-in-out;
  }
`;

/* Contact */
const ContactSection = styled(Box)`
  text-align: center;
  margin: 50px 0;
  padding: 20px;
  background: #f0f0ff;
  width: 100%;
  border-radius: 16px;
`;

/* Data */
const features = [
    { icon: <School fontSize="large" style={{ color: "#6A0DAD" }} />, title: "Student Management", description: "Manage student records, grades, and attendance efficiently." },
    { icon: <People fontSize="large" style={{ color: "#6A0DAD" }} />, title: "Faculty Management", description: "Monitor faculty schedules, classes, and performance reports." },
    { icon: <Event fontSize="large" style={{ color: "#6A0DAD" }} />, title: "Attendace Management", description: "Manage attendance seamlessly." },
];

const testimonials = [
    { message: "This system has simplified student record management!", author: "Faculty" },
    { message: "Attendance tracking and academic reports are now hassle-free.", author: "Student" },
];
