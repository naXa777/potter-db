import {
  getCharacterBySlug,
  getCharacters,
} from "../../../lib/load_characters";

import CharacterDetail from "../../../components/pages/characters/[slug]/CharacterDetail";
import CharacterMeta from "../../../components/pages/characters/[slug]/CharacterMeta";

const Character = ({ data, links }) => {
  const { attributes } = data;

  return (
    <>
      <CharacterMeta attributes={attributes} />
      <CharacterDetail attributes={attributes} apiLink={links?.self} />
    </>
  );
};

export async function getStaticPaths() {
  const defaultSlugs = [
    "harry-potter",
    "ronald-weasley",
    "hermione-granger",
    "ginevra-weasley",
    "severus-snape",
    "albus-dumbledore",
    "tom-riddle",
    "draco-malfoy",
    "james-potter-i",
    "lily-j-potter",
    "albus-potter",
    "dobby",
    "sirius-black",
    "luna-lovegood",
    "dudley-dursley",
    "rubeus-hagrid",
    "vernon-dursley",
    "petunia-dursley",
    "arthur-weasley",
    "molly-weasley",
  ];

  const query = { perPage: 30 };
  const fetchedCharacters = await getCharacters(query);

  const characters = fetchedCharacters?.data;

  const slugs = [
    ...defaultSlugs,
    ...characters.map((character) => character.attributes.slug),
  ];

  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }) {
  const character = await getCharacterBySlug(params.slug);
  const { data, links, hasError } = character;

  if (hasError || !data || !data.attributes || !links) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
      links,
    },
  };
}

export default Character;
