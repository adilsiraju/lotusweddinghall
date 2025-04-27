
import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  image?: string;
  className?: string;
}

const TestimonialCard = ({ quote, author, role, image, className }: TestimonialCardProps) => {
  return (
    <div className={cn(
      "bg-white p-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg flex flex-col",
      className
    )}>
      <div className="mb-6 text-lotus-gold">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="opacity-30">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.077-1.928.74-2.932.386-.73.77-1.37 1.16-1.932l-1.32-.532c-.41.61-.826 1.23-1.248 1.86-.432.644-.737 1.243-.911 1.798-.736 1.084-.948 2.565-.283 4.086.72 1.644 2.024 2.203 3.433 2.203 1.39 0 2.463-.55 3.322-1.636.76-.958 1.038-2.248.83-3.858zm.684-.035c.143.668.097 1.425-.138 2.22-.565 1.903-1.954 2.932-4.163 3.082-.17.015-.35.02-.532.02-1.82 0-3.253-.868-4.287-2.472C1.044 15.812 1.373 13.24 2.23 11.62c.636-1.207 1.49-2.367 2.57-3.483l1.498-.601c.517-.207.973-.374 1.368-.503.398-.13.605-.195.605-.195s-.17.224-.483.66c-.31.44-.528.868-.657 1.284-.134.425-.21.858-.23 1.3-.02.44.022.91.124 1.41.15.736.41 1.285.78 1.647.386.367.867.58 1.445.638.576.06 1.073-.06 1.485-.362.412-.3.71-.71.892-1.226.182-.515.257-1.08.224-1.694-.032-.603-.23-1.198-.592-1.788-.362-.582-.851-1.017-1.472-1.304-.583-.266-1.144-.376-1.71-.324l.58-1.143c1.653.035 2.873.566 3.652 1.613.525.702.787 1.458.79 2.27 0 .258-.035.538-.11.833zm-6.724 6.606c.405-.26.754-.6 1.046-1.022.292-.42.496-.9.614-1.438.117-.538.128-1.036.034-1.492-.073-.353-.214-.698-.428-1.032-.213-.333-.486-.6-.82-.8l-.43-.29.484-.127c.334-.1.635-.144.885-.143.58.013 1.056.238 1.425.677.368.44.554 1.01.554 1.708 0 .832-.26 1.562-.777 2.192-.518.63-1.198.944-2.04.944-.307 0-.605-.053-.895-.16l-.412-.15.3-.26.46-.39z"/>
        </svg>
      </div>
      <p className="italic text-gray-700 mb-6">{quote}</p>
      <div className="mt-auto flex items-center">
        {image && (
          <div className="mr-4">
            <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
          </div>
        )}
        <div>
          <h5 className="font-medium text-lg">{author}</h5>
          {role && <p className="text-gray-500 text-sm">{role}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
