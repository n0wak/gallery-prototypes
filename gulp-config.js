module.exports = {

  environments    : {

    dev     : {
      dest            :   './public/dev/',
      deploy          :   './deploy/dev/',
      url : "http://localhost:9000/"

    },

    gh : {
      dest            :   './docs/',
      deploy          :   './docs/',
      url : "https://n0wak.github.io/gallery-prototypes/"
    }

  },


  gallery : [

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0286.jpg",
      class : "single",
      url : "the-continent",
      title : "The Continent",
      description : "The Continent description"

    },

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0367.jpg",
      class : "double",
      crop : "bottom",
      url : "icebergs-1",
      title : "Icebergs 1",
      description : "Icebergs 1 description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0461.jpg",
      class : "double",
      url : "icebergs-2",
      title : "Icebergs 2",
      description : "Icebergs 2 description"

    },

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0323.jpg",
      class : "single",
      url : "penguin-colony",
      title : "Penguin Colony",
      description : "Penguin Colony Description"

    },
    {
      type : "text",
      class : "slide",
      title : "Damoy Point",
      description : "Overnight Camp at Damoy Point"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0508.jpg",
      class : "double",
      url : "overnight-damoy-1",
      title : "Overnight at Damoy",
      description : "Overnight at DamoyDescription"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0512.jpg",
      class : "double",
      crop : "bottom",
      url : "third",
      title : "Overnight at Damoy",
      description : "Overnight at DamoyDescription"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0533.jpg",
      class : "single",
      url : "overnight-damoy-2",
      title : "Night Sun, 2AM",
      description : "Overnight at DamoyDescription"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0554.jpg",
      crop : "bottom",
      class : "single",
      url : "damoy-point",
      title : "Damoy Point",
      description : "Damoy Description"

    },

    {
      type : "text",
      class : "slide",
      title : "Deception Island",
      description : "The edge of a volcano"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0984.jpg",
      class : "triple",
      url : "deception-1",
      title : "Deception",
      description : "Deception Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0957.jpg",
      class : "triple",
      url : "deception-entering",
      title : "Deception",
      description : "Deception Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0960.jpg",
      class : "triple",
      url : "deception-2",
      title : "Deception",
      description : "Deception Description"

    },

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0710.jpg",
      class : "single",
      url : "mountains",
      title : "Mountains",
      description : "Mountains Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0717.jpg",
      class : "single",
      url : "sunlight",
      title : "Sunlit",
      description : "Sunlight Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0823.jpg",
      class : "single",
      url : "port-lockroy",
      title : "Port Lockroy",
      description : "Description"

    },

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0160.jpg",
      class : "triple",
      url : "penguins-1",
      title : "Penguins",
      description : "Penguins Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0439.jpg",
      class : "triple",
      url : "penguins-2",
      title : "Penguins",
      description : "Penguins Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0685.jpg",
      class : "triple",
      url : "penguins-3",
      title : "Penguins",
      description : "Penguins Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP1064.jpg",
      class : "double",
      url : "penguins-4",
      title : "Penguins",
      description : "Penguins Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP1050.jpg",
      class : "double",
      url : "seal",
      crop : "right",
      title : "Deception",
      description : "Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP1086.jpg",
      class : "single",
      url : "outcrop",
      title : "Outcropping",
      description : "Outcropping Description"

    },
    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0671.jpg",
      class : "single",
      url : "ship",
      title : "Expedition",
      description : "Expedition Description"
    },

    {
      type : "image",
      src : "https://mikenowak.imgix.net/antarctica/IMGP0280.jpg",
      class : "single",
      url : "sunset",
      title : "Sun Setting",
      description : "Sun Set Description"

    }

  ]

};
