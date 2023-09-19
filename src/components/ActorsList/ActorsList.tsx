import { Edge } from "@/interfaces/SingleMovieCastResponse.interface";
import { ActorItem } from "..";
import styles from "./ActorsList.module.css";

interface Props {
  actors: Edge[];
}

export const ActorsList = ({ actors }: Props) => {
  return (
    <div className={styles.casting_container}>
      <h3 className={`my-5 sm:mt-8 sm:mb-4 ${styles.casting_title}`}>
        Cast of actors
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-5">
        {actors.map((actorItem) => (
          <ActorItem actor={actorItem} key={actorItem.node.name.id} />
        ))}
      </div>
    </div>
  );
};
