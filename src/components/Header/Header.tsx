'use client';

import type { FC } from 'react';
import React from 'react';
import Avatar from 'src/components/Avatar';

import SVGSearch from '../Icons/SVGSearch';
import Button from '../Button';

const Header: FC = () => {
  return (
    <header className="border">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center sm:justify-between sm:gap-4">
          <Button
            label="Go to source code"
            onClick={() => window.open('https://github.com/metecan/simple-bank', '_blank')}
          />

          <div className="flex flex-1 items-center justify-between gap-8 sm:justify-end">
            <div className="flex gap-4">
              <button
                type="button"
                className="block shrink-0 rounded-lg bg-white p-2.5 text-gray-600 shadow-sm hover:text-gray-700 sm:hidden"
              >
                <span className="sr-only">Search</span>
                <SVGSearch />
              </button>
            </div>

            <Avatar
              image="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              name="Metecan Kaplan"
              email="metecan@duck.com"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
