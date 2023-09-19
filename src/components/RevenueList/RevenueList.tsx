import { ISingleMovieRevenueBudgetResults } from "@/interfaces/SingleMovieRevenueBudget.interface";
import styles from "./RevenueList.module.css";

interface Props {
  revenueData: ISingleMovieRevenueBudgetResults;
}

const NotReleasedYet = () => (
  <p className={styles.not_released}>Not released yet.</p>
);

export const RevenueList = ({ revenueData }: Props) => {
  return (
    <div
      className={`grid sm:grid-cols-2 sm:my-8 md:mt-4 md:mb-8 md:gap-y-5 ${styles.revenue_container}`}
    >
      <div className={styles.revenue_item}>
        <p className={styles.revenue_item_title}>Production Budget</p>
        {revenueData.productionBudget ? (
          <p className={styles.revenue_item_value}>
            {revenueData.productionBudget?.budget?.amount.toLocaleString(
              "en-US"
            )}{" "}
            USD
          </p>
        ) : (
          <NotReleasedYet />
        )}
      </div>
      <div className={styles.revenue_item}>
        <p className={styles.revenue_item_title}>Lifetime Gross Budget</p>
        {revenueData.lifetimeGross ? (
          <p className={styles.revenue_item_value}>
            {revenueData.lifetimeGross?.total?.amount.toLocaleString("en-US")}{" "}
            USD
          </p>
        ) : (
          <NotReleasedYet />
        )}
      </div>
      <div className={styles.revenue_item}>
        <p className={styles.revenue_item_title}>Opening Weekend Budget</p>
        {revenueData.openingWeekendGross ? (
          <p className={styles.revenue_item_value}>
            {revenueData.openingWeekendGross?.gross?.total?.amount.toLocaleString(
              "en-US"
            )}{" "}
            USD
          </p>
        ) : (
          <NotReleasedYet />
        )}
      </div>
      <div className={styles.revenue_item}>
        <p className={styles.revenue_item_title}>World Wide Budget</p>
        {revenueData.worldwideGross ? (
          <p className={styles.revenue_item_value}>
            {revenueData.worldwideGross?.total?.amount.toLocaleString("en-US")}{" "}
            USD
          </p>
        ) : (
          <NotReleasedYet />
        )}
      </div>
    </div>
  );
};
