import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useWeb3React } from "@web3-react/core";
import { ConnectionModal } from "./ConnectionModal";
import { Web3Provider } from "@ethersproject/providers";

const navigation = [
  //  { name: 'Dashboard', href: '#', current: true },
  { name: "Profile", href: "#", current: false },
  { name: "Frens", href: "/FriendsPage", current: false },
  { name: "Communities", href: "/CommunitiesPage", current: false },
  { name: "Discord", href: "/DiscordPage", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

<>xaxa</>;
export default function Example() {
  const { connector, provider, isActive } = useWeb3React();
  const [address, setAddress] = useState("");
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    if (!provider) return;
    (provider as Web3Provider).getSigner(0).getAddress().then(setAddress);
  }, [provider]);

  return (
    <>
      <Disclosure as="nav" className="bg-[#7EBDC3]">
        {({ open }) => (
          <>
            <div className="max-w-full px-2 mx-auto sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                  <div className="flex items-center flex-shrink-0">
                    <img
                      className="block w-auto h-8 text-white shadow-sm lg:hidden rounded-2xl"
                      src="https://i.imgur.com/gGtBm3F.jpeg"
                      alt="F3Blogo"
                    />
                    <img
                      className="hidden w-auto h-8 text-white shadow-sm lg:block rounded-2xl"
                      src="https://i.imgur.com/gGtBm3F.jpeg"
                      alt="F3Blogo"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-violet-900 text-white"
                              : "text-white hover:bg-[#C6DEA6] hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/*<button
                  type="button"
                  className="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="w-6 h-6" aria-hidden="true" />
                </button>*/}

                  {!isActive ? (
                    <button
                      type="button"
                      onClick={() => setModalShown(true)}
                      className="px-4 py-2 bg-transparent border border-gray-200 rounded shadow-sm hover:bg-blue-600 hover:text-white hover:border-gray-900"
                    >
                      <span className="font-medium text-white">
                        Connect Wallet
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => connector.deactivate()}
                      className="px-4 py-2 bg-transparent border border-gray-200 rounded shadow-sm hover:bg-blue-600 hover:text-white hover:border-gray-900"
                    >
                      <span className="font-medium text-white">
                        Disconnect {address.substring(0, 6)}...
                        {address.substring(38, 42)}
                      </span>
                    </button>
                  )}

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    {/*<div>
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>*/}
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {modalShown && <ConnectionModal onClose={() => setModalShown(false)} />}
    </>
  );
}
