import {
    sidebarStyles,
    sidebarToggleStyles,
    sidebarSize,
} from './SidebarLayout.styles'
import classNames from 'classnames'
import { useParentSize } from '../useParentSize'
import { useEffect, useState, useRef } from 'react'

import { LayoutOverlay } from '../LayoutOverlay'

const isBooleanSpecified = x => x === true || x === false

export const Sidebar = ({
    className,
    side = 'left',
    style,
    toggleClassname,
    toggleStyle,
    children,
    collapsed: forceCollapsed,
    collapsible = true,
    collapseBreakpoint = sidebarSize * 3,
    toggled: forceToggled,
}) => {
    const [collapsed, setCollapsed] = useState(!!forceCollapsed)
    const [toggled, setToggled] = useState(!!forceToggled)
    const elementRef = useRef()
    const size = useParentSize(elementRef)

    useEffect(() => {
        if (!isBooleanSpecified(forceCollapsed) && collapsible) {
            setCollapsed(size.width < collapseBreakpoint)
        }
    }, [size])

    return (
        <>
            <LayoutOverlay
                ref={elementRef}
                className={classNames(
                    className,
                    sidebarStyles.className,
                    'sidebarContainer',
                    `sidebarSide-${side}`,
                    collapsed && 'sidebarCollapsed',
                    toggled && 'sidebarToggled'
                )}
                style={style}
            >
                {sidebarStyles.styles}
                {children}
            </LayoutOverlay>

            {/* TODO: Make this accessible */}

            {collapsed && !isBooleanSpecified(forceToggled) && (
                <div
                    onClick={() => setToggled(toggled => !toggled)}
                    className={classNames(
                        toggleClassname,
                        sidebarToggleStyles.className,
                        'sidebarToggle',
                        `sidebarSide-${side}`,
                        toggled && 'sidebarToggled'
                    )}
                    style={toggleStyle}
                >
                    {sidebarToggleStyles.styles}
                </div>
            )}
        </>
    )
}
