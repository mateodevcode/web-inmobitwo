import { LinkColumn } from "./LinkColumn";

export function FooterLinkColumns({ groups }) {
  return (
    <>
      {groups.map(({ id, title, links }) => (
        <LinkColumn key={id} title={title} links={links} />
      ))}
    </>
  );
}
