
import { Contact, Interaction, Reminder } from '@/pages/Index';

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    position: 'Senior Product Manager',
    tags: ['work'],
    platforms: ['LinkedIn', 'Email', 'Slack'],
    lastInteraction: '2024-01-15',
    notes: 'Met at the product conference last year. Very insightful about user experience trends.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@startup.io',
    company: 'InnovateLab',
    position: 'CTO',
    tags: ['friends'],
    platforms: ['Twitter', 'LinkedIn', 'Email'],
    lastInteraction: '2024-01-12',
    notes: 'Former colleague who started his own company. Great mentor for technical decisions.'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@designstudio.com',
    phone: '+1 (555) 987-6543',
    company: 'Creative Design Studio',
    position: 'Lead Designer',
    tags: ['work', 'casual'],
    platforms: ['Instagram', 'Behance', 'Email'],
    lastInteraction: '2024-01-10',
    notes: 'Talented designer who helped with our brand refresh. Always shares great design inspiration.'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@consulting.com',
    company: 'Strategic Consultants',
    position: 'Senior Consultant',
    tags: ['neighbours'],
    platforms: ['LinkedIn', 'Email'],
    lastInteraction: '2024-01-08',
    notes: 'Business strategy expert. Helped with market analysis for our new product launch.'
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@mediahouse.com',
    company: 'Digital Media House',
    position: 'Content Director',
    tags: ['family'],
    platforms: ['Twitter', 'LinkedIn', 'Instagram'],
    lastInteraction: '2024-01-14',
    notes: 'Content marketing expert with great insights into digital trends and audience engagement.'
  },
  {
    id: '6',
    name: 'Alex Thompson',
    email: 'alex.thompson@venture.capital',
    company: 'Future Ventures',
    position: 'Investment Partner',
    tags: ['work', 'friends'],
    platforms: ['LinkedIn', 'Email', 'AngelList'],
    lastInteraction: '2024-01-11',
    notes: 'VC partner focused on early-stage tech companies. Good contact for funding opportunities.'
  }
];

export const mockInteractions: Interaction[] = [
  {
    id: '1',
    contactId: '1',
    platform: 'LinkedIn',
    type: 'message',
    content: 'Thanks for sharing that article about product-market fit. Really insightful!',
    date: '2024-01-15',
    isInbound: false
  },
  {
    id: '2',
    contactId: '1',
    platform: 'LinkedIn',
    type: 'post-reaction',
    content: 'Liked your post about the new product launch',
    date: '2024-01-14',
    isInbound: true
  },
  {
    id: '3',
    contactId: '2',
    platform: 'Email',
    type: 'email',
    content: 'Following up on our discussion about the tech stack migration. Here are the resources I mentioned.',
    date: '2024-01-12',
    isInbound: false
  },
  {
    id: '4',
    contactId: '2',
    platform: 'Twitter',
    type: 'mention',
    content: '@username Great insights on scaling engineering teams!',
    date: '2024-01-11',
    isInbound: true
  },
  {
    id: '5',
    contactId: '3',
    platform: 'Instagram',
    type: 'comment',
    content: 'Love this design concept! The color palette is perfect.',
    date: '2024-01-10',
    isInbound: false
  },
  {
    id: '6',
    contactId: '4',
    platform: 'LinkedIn',
    type: 'message',
    content: 'The market analysis report you provided was extremely helpful for our strategy session.',
    date: '2024-01-08',
    isInbound: false
  },
  {
    id: '7',
    contactId: '5',
    platform: 'Twitter',
    type: 'retweet',
    content: 'Retweeted your thread about content marketing trends',
    date: '2024-01-14',
    isInbound: false
  },
  {
    id: '8',
    contactId: '6',
    platform: 'Email',
    type: 'email',
    content: 'Thank you for the introduction to the founder. The meeting went very well!',
    date: '2024-01-11',
    isInbound: false
  }
];

export const mockReminders: Reminder[] = [
  {
    id: '1',
    contactId: '1',
    title: 'Follow up on product feedback',
    description: 'Sarah mentioned she had some thoughts on our latest product update. Schedule a call to discuss.',
    dueDate: '2024-01-18',
    priority: 'high',
    completed: false
  },
  {
    id: '2',
    contactId: '2',
    title: 'Send tech architecture proposal',
    description: 'Michael asked for our technical architecture proposal for the new microservices setup.',
    dueDate: '2024-01-20',
    priority: 'high',
    completed: false
  },
  {
    id: '3',
    contactId: '3',
    title: 'Review design mockups',
    description: 'Emily will send the new design mockups for the mobile app. Schedule review session.',
    dueDate: '2024-01-16',
    priority: 'medium',
    completed: false
  },
  {
    id: '4',
    contactId: '4',
    title: 'Schedule strategy meeting',
    description: 'David suggested a quarterly strategy review. Set up meeting for next month.',
    dueDate: '2024-01-22',
    priority: 'medium',
    completed: false
  },
  {
    id: '5',
    contactId: '5',
    title: 'Collaborate on content calendar',
    description: 'Lisa offered to help with our Q1 content marketing calendar.',
    dueDate: '2024-01-25',
    priority: 'low',
    completed: false
  },
  {
    id: '6',
    contactId: '6',
    title: 'Prepare pitch deck',
    description: 'Alex wants to see our updated pitch deck for the next funding round.',
    dueDate: '2024-01-15',
    priority: 'high',
    completed: true
  },
  {
    id: '7',
    contactId: '1',
    title: 'Send birthday wishes',
    description: 'Sarah\'s birthday is coming up. Send a personal message.',
    dueDate: '2024-01-12',
    priority: 'low',
    completed: true
  }
];
