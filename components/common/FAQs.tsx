// components/home/FAQSection.tsx
"use client";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is AprilFull?",
    answer:
      "AprilFull is Africa's premier Blockchain & Entertainment event, bringing together Web3 enthusiasts, artists, creators, and innovators for education, networking, and live entertainment.",
  },
  {
    id: 2,
    question: "Who should attend AprilFull?",
    answer:
      "Web3 enthusiasts, blockchain professionals, artists, creators, and anyone interested in the future of entertainment and technology.",
  },
  {
    id: 3,
    question: "When and where does the event take place?",
    answer:
      "Check our website for the latest event dates and venue information.",
  },
  {
    id: 4,
    question: "How can I buy tickets?",
    answer:
      "Tickets are available on our official website. Early bird discounts are often available.",
  },
  {
    id: 5,
    question: "What kind of activities happen at AprilFull?",
    answer:
      "Keynote speeches, workshops, live performances, networking, and interactive Web3 experiences.",
  },
  {
    id: 6,
    question: "Can artists and performers participate?",
    answer:
      "Yes! Contact us through our website with your portfolio for consideration.",
  },
  {
    id: 7,
    question: "Is AprilFull suitable for beginners in blockchain?",
    answer:
      "Absolutely! We offer sessions for all experience levels, from beginners to experts.",
  },
  {
    id: 8,
    question: "Are there sponsorship opportunities?",
    answer:
      "Yes, various sponsorship packages are available. Contact us for details.",
  },
  {
    id: 9,
    question: "How can I stay updated about AprilFull?",
    answer:
      "Follow us on social media and subscribe to our newsletter for the latest updates.",
  },
  {
    id: 10,
    question: "Who organizes AprilFull?",
    answer:
      "A dedicated team passionate about Web3 and African entertainment culture.",
  },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="py-20 text-black dark:text-white dark:bg-gray-950 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
          FAQs (Frequently Asked Questions)
        </h2>

        <div className="space-y-0">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border-b border-gray-800 last:border-b-0"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between py-6 text-left group hover:opacity-80 transition-opacity"
              >
                <span className=" text-lg pr-4">{faq.question}</span>
                <span className=" text-xl shrink-0">
                  {openId === faq.id ? "×" : "→"}
                </span>
              </button>

              {openId === faq.id && (
                <div className="pb-6 text-[#D3B9EF] leading-relaxed border-t border-cyan-900/30 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
