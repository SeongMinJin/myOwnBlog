import Nav from "./nav"
import Section from "./section"

export default function Main() {
	return (
		<div className="w-full flex justify-center px-6 min-h-screen">
			<div className="w-full tablet:w-[1080px] laptop:w-[1440px] desktop:w-[1920px]">
				<Nav />
				<Section />
			</div>
		</div>
	)
}