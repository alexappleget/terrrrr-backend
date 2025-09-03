import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Comprehensive API Docs",
    Img: require("@site/static/img/penguin-guitar.png").default,
    description: (
      <>
        Find detailed documentation for every backend function, route, and
        middleware. Easily understand how to use and extend the API.
      </>
    ),
  },
  {
    title: "Role-Based Access Explained",
    Img: require("@site/static/img/penguin-code.png").default,
    description: (
      <>
        Learn how authentication and authorization work, including JWT, user
        roles, and protected routes. Security best practices are highlighted
        throughout.
      </>
    ),
  },
  {
    title: "Database Schema Reference",
    Img: require("@site/static/img/penguin-computer.png").default,
    description: (
      <>
        Explore clear documentation for all database models, relationships, and
        constraints. Understand how your backend data is structured and managed.
      </>
    ),
  },
];

function Feature({ title, Img, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={Img} className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
