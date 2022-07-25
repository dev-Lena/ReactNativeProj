export default (scheme) => {
    return {
        color: scheme === "dark" ? "#d2dae2" : "#1e272e",
        bgColor: scheme === "dark" ? "#1e272e" : "white",
        activeTint: scheme === "dark" ? "#ff5e57" : "#f53b57",
        inactiveTint: scheme === "dark" ? "#d2dae2" : "#485460",
    };
};
