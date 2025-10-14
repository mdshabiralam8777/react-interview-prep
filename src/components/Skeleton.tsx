import React from "react";
import styles from "../../src/Styles/Skeleton.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  count = 1,
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={styles.skeleton}
      style={{ width, height, marginBottom: "20px" }}
    ></div>
  ));

  return <>{skeletons}</>;
};

export default Skeleton;
