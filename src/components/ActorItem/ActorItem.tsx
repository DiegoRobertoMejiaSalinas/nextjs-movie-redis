import { Edge } from "@/interfaces/SingleMovieCastResponse.interface";
import Image from "next/image";
import styles from "./ActorItem.module.css";

interface Props {
  actor: Edge;
}

const PERSON_UNAVAILABLE =
  "https://bitslog.files.wordpress.com/2013/01/unknown-person1.gif";

export const ActorItem = ({ actor }: Props) => {
  return (
    <div className={styles.actor_item}>
      <h3 className="mb-2">{actor.node.name.nameText.text}</h3>
      <div className={styles.image_container}>
        <Image
          alt={actor.node.name.nameText.text}
          src={actor.node?.name?.primaryImage?.url || PERSON_UNAVAILABLE}
          fill
          sizes="(max-width: 576px) 100%, (max-width: 768px) 80%, (max-width: 992px) 70%, 60%"
        />
      </div>
      <div className="mt-3">
        {actor?.node?.characters?.map((characterItem) => (
          <h2 key={`${actor.node.name.id}_${characterItem.name}`}>
            {characterItem.name}
          </h2>
        ))}
        {!actor?.node?.characters?.length && <h2>Unknown</h2>}
      </div>
    </div>
  );
};
