import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import I18n from '../i18n/components/languageSelector'
import { useTranslation } from 'react-i18next';


const navigation = [
    { name: 'Convert', href: '/', current: true }
];

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function Header(props : any) {
    const { t } = useTranslation();

    return (
        <>
            <div className="flex bg-gray-800 max-h-16 justify-between">
                <div className="flex w-full">
                    <Disclosure as="nav" className="">
                        {({ open }) => (
                            <>
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex items-center justify-between h-16">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src="/icons/dollar.png"
                                                    alt="Workflow"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className={classNames(
                                                                item.name === props.page
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'px-3 py-2 rounded-md text-sm font-medium'
                                                            )}
                                                            aria-current={item.name === props.page ? 'page' : undefined}
                                                        >
                                                            {t(`header.${item.name}`)}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">

                                                {/* Profile dropdown */}
                                                <Menu as="div" className="ml-3 relative">
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                    </Transition>
                                                </Menu>
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    //<XIcon className="block h-6 w-6" aria-hidden="true" />
                                                    <></>
                                                ) : (
                                                    //<MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                                    <></>
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="a"
                                                href={item.href}
                                                className={classNames(
                                                    item.name === props.page ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block px-3 py-2 rounded-md text-base font-medium'
                                                )}
                                                aria-current={item.name === props.page ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
                <I18n />
            </div>
        </>
    )
}