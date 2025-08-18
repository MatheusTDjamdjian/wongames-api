import type { Schema, Struct } from '@strapi/strapi';

export interface PageButton extends Struct.ComponentSchema {
  collectionName: 'components_page_buttons';
  info: {
    displayName: 'button';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Buy now'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageHighlight extends Struct.ComponentSchema {
  collectionName: 'components_page_highlights';
  info: {
    displayName: 'highlight';
    icon: 'star';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['right', 'left']> &
      Schema.Attribute.DefaultTo<'right'>;
    background: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    buttonLink: Schema.Attribute.String & Schema.Attribute.Required;
    floatImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PagePopularGames extends Struct.ComponentSchema {
  collectionName: 'components_page_popular_games';
  info: {
    displayName: 'popularGames';
    icon: 'hashtag';
  };
  attributes: {
    game: Schema.Attribute.Relation<'oneToOne', 'api::game.game'>;
    highlight: Schema.Attribute.Component<'page.highlight', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PageRibbon extends Struct.ComponentSchema {
  collectionName: 'components_page_ribbons';
  info: {
    displayName: 'ribbon';
    icon: 'cog';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['primary', 'secondary']> &
      Schema.Attribute.DefaultTo<'primary'>;
    size: Schema.Attribute.Enumeration<['small', 'normal']> &
      Schema.Attribute.DefaultTo<'normal'>;
    text: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface PageSection extends Struct.ComponentSchema {
  collectionName: 'components_page_sections';
  info: {
    displayName: 'section';
    icon: 'bulletList';
  };
  attributes: {
    highlight: Schema.Attribute.Component<'page.highlight', false>;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'page.button': PageButton;
      'page.highlight': PageHighlight;
      'page.popular-games': PagePopularGames;
      'page.ribbon': PageRibbon;
      'page.section': PageSection;
    }
  }
}
