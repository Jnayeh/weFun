import "~/styles/loading.css";
import LoadingLogo from "~/components/SvgStore/LoadingLogo";

export default function Loading() {
  return (
    <div className="loading-container">
      <LoadingLogo  className="loading-logo"/>
      <h2 className="sr-only">Loading...</h2>
    </div>
  );
}
