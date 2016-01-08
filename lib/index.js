
import NavigatorAutopilot from './NavigatorAutopilot';
import ExNavigatorAutopilot from './ExNavigatorAutopilot';
import applyNavigatorChanges from './applyNavigatorChanges';

export default {
	NavigatorAutopilot,
	ExNavigatorAutopilot,
	applyNavigatorChanges,
	Navigator: NavigatorAutopilot,
	ExNavigator: ExNavigatorAutopilot
};

export {
	NavigatorAutopilot,
	ExNavigatorAutopilot,
	applyNavigatorChanges,
	NavigatorAutopilot as Navigator,
	ExNavigatorAutopilot as ExNavigator
};
