import { useState } from 'react';

const faqData = [
  {
    question: 'What is Peer Connect?',
    answer:
      'Peer Connect is a platform that connects developers with similar skills and interests to collaborate on projects and share knowledge.',
  },
  {
    question: 'How do I sign up?',
    answer:
      'You can sign up by clicking on the "Sign Up" button on the homepage and filling out the registration form with your details.',
  },
  {
    question: 'Is Peer Connect free to use?',
    answer: 'Yes, Peer Connect is completely free to use for all users.',
  },
  {
    question: 'How can I find other developers to collaborate with?',
    answer:
      'You can use the search feature to find developers with specific skills or interests. You can also browse through the list of available projects and join one that interests you.',
  },
  {
    question: 'Can I create my own project on Peer Connect?',
    answer:
      'Yes, you can create your own project and invite other developers to join and collaborate with you.',
  },
  {
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.',
  },
  {
    question: 'Can I delete my account?',
    answer:
      'Yes, you can delete your account by going to your account settings and selecting the "Delete Account" option.',
  },
  {
    question: 'How do I update my profile information?',
    answer:
      'You can update your profile information by going to your account settings and editing your profile details.',
  },
  {
    question: 'Is my data safe on Peer Connect?',
    answer:
      'Yes, we take data security very seriously and use industry-standard measures to protect your data.',
  },
  {
    question: 'Can I join multiple projects?',
    answer:
      'Yes, you can join multiple projects and collaborate with different teams simultaneously.',
  },
  {
    question: 'How do I leave a project?',
    answer:
      'You can leave a project by going to the project page and selecting the "Leave Project" option.',
  },
  {
    question: 'Can I message other developers directly?',
    answer:
      'Yes, you can send direct messages to other developers through the messaging feature on the platform.',
  },
  {
    question: 'How do I report a problem or bug?',
    answer:
      'You can report a problem or bug by contacting our support team through the "Contact Us" page.',
  },
  {
    question: 'Can I suggest new features for Peer Connect?',
    answer:
      'Yes, we welcome feature suggestions. You can submit your ideas through the "Feedback" section on the platform.',
  },
  {
    question: 'How do I change my email address?',
    answer:
      'You can change your email address by going to your account settings and updating your email information.',
  },
  {
    question: 'What should I do if I encounter inappropriate behavior?',
    answer:
      'If you encounter inappropriate behavior, please report it to our support team immediately so we can take appropriate action.',
  },
  {
    question: 'Can I customize my notification settings?',
    answer:
      'Yes, you can customize your notification settings by going to your account settings and adjusting your preferences.',
  },
  {
    question: 'How do I search for projects?',
    answer:
      'You can search for projects using the search bar on the homepage or by browsing through the project categories.',
  },
  {
    question: 'Can I invite friends to join Peer Connect?',
    answer:
      'Yes, you can invite friends to join Peer Connect by sharing your referral link or sending them an invitation through the platform.',
  },
  {
    question: 'How do I earn badges on Peer Connect?',
    answer:
      'You can earn badges by completing certain activities and milestones on the platform, such as contributing to projects or helping other developers.',
  },
  {
    question: 'What is the Peer Connect community?',
    answer:
      'The Peer Connect community is a group of developers who use the platform to collaborate, share knowledge, and support each other.',
  },
  {
    question: 'Can I host events on Peer Connect?',
    answer:
      'Yes, you can host events such as webinars, workshops, and meetups on Peer Connect. Contact our support team for more information.',
  },
];

const Faq = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers((prevVisibleAnswers) => ({
      ...prevVisibleAnswers,
      [index]: !prevVisibleAnswers[index],
    }));
  };

  return (
    <div className="bg-black-2 py-35 flex min-h-[50vh] w-full flex-col px-40">
      <div>
        <h1 className="text-5xl font-bold text-green-400">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="pt-4 text-lg">
        <h5>Quick answers to the questions you may have.</h5>
      </div>
      <div className="pt-15 gap-30 flex">
        <div className="flex w-[50%] flex-col gap-10">
          {faqData.slice(0, Math.ceil(faqData.length / 2)).map((faq, index) => (
            <div key={index} className="faq-item">
              <h3
                className="cursor-pointer text-xl text-slate-200"
                onClick={() => toggleAnswer(index)}
              >
                {visibleAnswers[index] ? '▲' : '▼'}&nbsp;&nbsp;&nbsp;{' '}
                {faq.question}
              </h3>
              {visibleAnswers[index] && (
                <p className="pt-2 text-lg text-slate-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
        <div className="flex w-[50%] flex-col gap-10">
          {faqData.slice(Math.ceil(faqData.length / 2)).map((faq, index) => (
            <div
              key={index + Math.ceil(faqData.length / 2)}
              className="faq-item"
            >
              <h3
                className="cursor-pointer text-xl text-slate-200"
                onClick={() =>
                  toggleAnswer(index + Math.ceil(faqData.length / 2))
                }
              >
                {visibleAnswers[index + Math.ceil(faqData.length / 2)]
                  ? '▲'
                  : '▼'}
                &nbsp;&nbsp;&nbsp; {faq.question}
              </h3>
              {visibleAnswers[index + Math.ceil(faqData.length / 2)] && (
                <p className="pt-2 text-lg text-slate-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
