import fetchAssign from '@hooks/mutations/fetchAssign';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import React, { useState, useEffect, useRef } from 'react';

const UnassignedActionsBtn = ({job}) => {
  const [isOpen, setIsOpen] = useState(false);
  const actionsRef = useRef(null);
  const scrollableContainerRef = useRef(null);
  const {mutate: assign} = fetchAssign()

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (actionsRef.current && scrollableContainerRef.current) {
      const actionsRect = actionsRef.current.getBoundingClientRect();
      const containerRect = scrollableContainerRef.current.getBoundingClientRect();

      if (actionsRect.bottom > containerRect.bottom) {
        console.log('Menu exceeds container height');
      }
    }
  }, [isOpen]);

  const handleAssign = () => {
    const jobId = job.id
    assign({jobId})
  }

  return (
    <div ref={actionsRef} className='relative inline-block'>
      <button onClick={handleOpen}>
        <DotsHorizontalIcon />
      </button>
      {isOpen && (
        <ul className="menu menu-sm bg-base-200 rounded-box absolute top-0 right-5 z-20 w-16 border border-gray-300 text-xs">
          <button onClick={handleAssign} type='button'>Assign</button>
        </ul>
      )}
    </div>
  );
};

export default UnassignedActionsBtn;
