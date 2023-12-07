import styles from "./Page.module.less";
import React, { PropsWithChildren } from "react";
import { Layout } from "antd";

export interface IPageProps {
  header?: string | null;
  mainContentLoading?: boolean;
}

export const Page = (props: PropsWithChildren<IPageProps>) => {
  return (
    <Layout.Content className={`${styles.mainContentArea}`}>
      <div className={styles.mainContent}>{props.children}</div>
    </Layout.Content>
  );
};
