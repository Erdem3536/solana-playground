import { useMemo } from "react";
import { useAtom } from "jotai";

import Select from "../../../../Select";
import { NETWORKS, NetworkName } from "../../../../../constants";
import { connAtom } from "../../../../../state";
import { PgConnection } from "../../../../../utils/pg";

const EndpointSetting = () => {
  const [conn, setConn] = useAtom(connAtom);

  const options = useMemo(() => {
    const options = NETWORKS.map((n) => ({ value: n.endpoint, label: n.name }));
    if (!NETWORKS.find((n) => n.endpoint === conn.endpoint)) {
      return options.concat({
        value: conn.endpoint,
        label: NetworkName.CUSTOM,
      });
    }
    return options;
  }, [conn.endpoint]);
  const value = useMemo(
    () => options.find((o) => o.value === conn.endpoint),
    [options, conn.endpoint]
  );

  return (
    <Select
      options={options}
      value={value}
      onChange={(newValue) => {
        const newEndpoint = NETWORKS.find(
          (n) => n.name === newValue?.label
        )!.endpoint;
        setConn((c) => ({ ...c, endpoint: newEndpoint }));
        PgConnection.update({ endpoint: newEndpoint });
      }}
    />
  );
};

export default EndpointSetting;
