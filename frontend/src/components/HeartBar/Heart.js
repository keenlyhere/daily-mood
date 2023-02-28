// import { useMemo } from "react";

// export default function Heart(props) {

//     const {
//         fillId,
//         changeRating,
//         isStarred,
//         isPartiallyFullStar,
//         isHovered,
//         hoverMode,
//         isCurrentHoveredStar,
//         isFirstStar,
//         isLastStar,
//         starDimension,
//         starSpacing,
//         starHoverColor,
//         starRatedColor,
//         starEmptyColor,
//         gradientPathName,
//         ignoreInlineStyles,
//         svgIconPath,
//         svgIconViewBox,
//     } = props;

//     const starContainerStyle = useMemo(() => ({
//         position: 'relative',
//         display: 'inline-block',
//         verticalAlign: 'middle',
//         paddingLeft: isFirstStar ? undefined : starSpacing,
//         paddingRight: isLastStar ? undefined : starSpacing,
//         cursor: changeRating ? 'pointer' : undefined
//     }), [changeRating, isFirstStar, isLastStar, starSpacing]);

//     const starSvgStyle = useMemo(() => ({
//         width: starDimension,
//         height: starDimension,
//         transition: 'transform .2s ease-in-out',
//         transform: isCurrentHoveredStar ? 'scale(1.1)' : undefined
//     }), [isCurrentHoveredStar, starDimension]);

//     const pathStyle = useMemo(() => {
//         let fill;
//         if (hoverMode) {
//         if (isHovered) fill = starHoverColor;
//         else fill = starEmptyColor;
//         } else {
//         if (isPartiallyFullStar) fill = `url('${gradientPathName}#${fillId}')`;
//         else if (isStarred) fill = starRatedColor;
//         else fill = starEmptyColor;
//         }

//         return {
//             fill: fill,
//             transition: 'fill .2s ease-in-out',
//         };
//     }, [fillId, hoverMode, isHovered, isPartiallyFullStar, isStarred, gradientPathName, starEmptyColor, starHoverColor, starRatedColor]);

//     const starClasses = useMemo(() => classNames({
//         'widget-svg': true,
//         'widget-selected': props.isSelected,
//         'multi-widget-selected': isPartiallyFullStar,
//         'hovered': isHovered,
//         'current-hovered': isCurrentHoveredStar
//     }), [props.isSelected, isPartiallyFullStar, isHovered, isCurrentHoveredStar]);


//     return (
//         <div className="HeartBar-container">
//             <div
//                 className="star-container"
//                 style={ignoreInlineStyles ? {} : starContainerStyle}
//             >
//             <svg
//                 viewBox={svgIconViewBox}
//                 className={ignoreInlineStyles ? '' : starClasses}
//                 style={ignoreInlineStyles ? {} : starSvgStyle}
//             >
//                 <path
//                 className="star"
//                 style={ignoreInlineStyles ? {} : pathStyle}
//                 d={svgIconPath}
//                 />
//             </svg>
//             </div>
//         </div>
//     )
// }
