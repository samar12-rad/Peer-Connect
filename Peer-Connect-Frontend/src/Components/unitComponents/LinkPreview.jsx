// src/Components/unitComponents/LinkPreview.jsx
import * as HoverCard from '@radix-ui/react-hover-card';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { encode } from 'qss';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
}) => {
  const params = encode({
    url,
    screenshot: true,
    meta: false,
    embed: 'screenshot.url',
    colorScheme: 'dark',
    'viewport.isMobile': true,
    'viewport.deviceScaleFactor': 1,
    'viewport.width': width * 3,
    'viewport.height': height * 3,
  });

  const src = `https://api.microlink.io/?${params}`;
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event) => {
    const targetRect = event.target.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCard.Root openDelay={50} closeDelay={100} onOpenChange={setOpen}>
      <HoverCard.Trigger
        onMouseMove={handleMouseMove}
        className={cn('text-black dark:text-white', className)}
      >
        {children}
      </HoverCard.Trigger>

      <HoverCard.Content
        className="z-50 origin-[var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 20 },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            className="rounded-xl shadow-xl"
            style={{ x: translateX }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
            >
              {isLoading && (
                <div className="flex h-full w-full items-center justify-center">
                  <motion.p
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-lg font-medium text-transparent"
                  >
                    Loading preview...
                  </motion.p>
                </div>
              )}
              <img
                src={src}
                width={width}
                height={height}
                className="rounded-lg"
                alt="preview"
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block' }}
              />
            </a>
          </motion.div>
        )}
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

LinkPreview.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
