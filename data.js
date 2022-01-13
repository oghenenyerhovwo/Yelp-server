import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Emakuneyi Anthony',
      email: 'emakuneyi2016@example.com',
      password: bcrypt.hashSync('1234', 8),
      role: "superAdmin"
    },
    {
      name: 'Emakuneyi Precious',
      email: 'emakuneyip@example.com',
      password: bcrypt.hashSync('1234', 8),
      role: "admin"
    },
    {
      name: 'Emakuneyi Ejiro',
      email: 'emakuneyiejiro@example.com',
      password: bcrypt.hashSync('1234', 8),
      role: "admin"
    },
    {
      name: 'Emakuneyi anne',
      email: 'emakuneyianne@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
    {
      name: 'Emakuneyi Godsent',
      email: 'emakuneyigodsent@example.com',
      password: bcrypt.hashSync('1234', 8),
    },
  ],
  campgrounds: [
    {
      title: 'Silver Lake',
      imageUrl: '/images/p1.jpg',
      price: 120,
      location: "Indonesia",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
    {
      title: 'Mountain High',
      imageUrl: '/images/p2.jpg',
      price: 60,
      location: "Spain",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
    {
      title: 'Manchester Garden',
      imageUrl: '/images/p3.jpg',
      price: 400,
      location: "England",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
    {
      title: 'London Garden',
      imageUrl: '/images/p4.jpg',
      price: 20,
      location: "England",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
    {
      title: 'Tinapa',
      imageUrl: '/images/p5.jpg',
      price: 30,
      location: "Nigeria",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
    {
      title: 'Lagos Highland',
      imageUrl: '/images/p6.jpg',
      price: 90,
      location: "Nigeria",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A quibusdam saepe, ipsum ipsam aliquid obcaecati quasi porro rem, officia alias laudantium omnis expedita unde deserunt neque officiis rerum eaque quaerat.',
    },
  ],
};
export default data;
