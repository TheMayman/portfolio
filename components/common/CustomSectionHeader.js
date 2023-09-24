import FadeIn from "./FadeIn";

const CustomSectionHeader = ({ title, innerClass, children }) => {
	return (
		<div className="section-header x2_padding">
			<FadeIn>
				<div className="inner-container _eleWrap">
					<h4 className={`title ${innerClass}`}>{title}</h4>
					<div className={`right-section ${innerClass}`}>{children}</div>
				</div>
			</FadeIn>
		</div>
	);
};

export default CustomSectionHeader;
