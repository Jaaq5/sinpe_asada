// app/loading.tsx
import React from "react";
import styles from "../styles/Hourglass.module.css";
import { Container } from "@mantine/core";

const Loading: React.FC = () => {
  return (
    <Container className={styles.hourglassContainer}>
      <div className={styles.hourglass}></div>
    </Container>
  );
};

export default Loading;
